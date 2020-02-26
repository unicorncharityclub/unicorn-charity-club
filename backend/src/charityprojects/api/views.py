import json
from ..models import CharityProjects, ProjectUser, ProjectUserDetails
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import User
from .serializers import ProjectUserSerializer
from rest_framework import status
from rest_framework.response import Response


def charity_project_details(request, project_id):
    response = {'status': "Invalid Request"}
    project = CharityProjects.objects.get(pk=project_id)
    print(request.build_absolute_uri(project.Video.url))
    if request.method == "GET":
        try:
            if project:
                response['status'] = "Success"
                response["project_name"] = project.Name
                response["project_goal"] = project.Goal
                response["project_mission"] = project.Mission
                response["project_video_name"] = project.Video_Name
                response["project_video"] = request.build_absolute_uri(project.Video.url)
                response["project_category"] = project.Category
                response["project_tags"] = project.Tags
                response["project_banner"] = request.build_absolute_uri(project.Banner.url)
            else:
                response['status'] = "Wrong project id"
        except ValueError:
            response['status'] = "Invalid Request"
    return JsonResponse(response)


def all_project_list(request):
    response = {'status': "Success"}
    project_list = []
    projects = CharityProjects.objects.all()
    for project in projects:
        project_list.append(project.Name)
        response['project_list'] = project_list
    return JsonResponse(response)


def all_project_info_list(request):
    response = {'status': "Success"}
    projects = CharityProjects.objects.all()
    project_list = []
    for project in projects:
        each_project = {"project_id": project.id, "project_name": project.Name, "project_goal": project.Goal, "project_mission": project.Mission,
                        "project_video": project.Video_Name, "project_category": project.Category,
                        "project_tags": project.Tags, "project_banner": request.build_absolute_uri(project.Banner.url)}
        project_list.append(each_project)

    response['project_list'] = project_list
    return JsonResponse(response)


def project_category(request):
    response = {'status': "Success"}
    category_list = []
    projects = CharityProjects.objects.all()
    for project in projects:
        category_list.append(project.Category)
        response['category_list'] = category_list
    return JsonResponse(response)

#Remove once front end is done
@csrf_exempt
def start_project(request):
    response = {'status': "Invalid Request"}
    invited_by = ""
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            project_id = json_data["project_id"]
            user_id = json_data["user_id"]
            if 'invited_by' not in json_data:
                invited_by = ""
            user = User.objects.get(pk=user_id)
            project = CharityProjects.objects.get(pk=project_id)
            project_user = ProjectUser.objects.create(project_id=project, user_id=user, invited_by=invited_by)
            project_user.save()
            pu_id = project_user.id
            project_user_details = ProjectUserDetails.objects.create(pu_id=project_user)
            project_user_details.save()
            response["pu_id"] = pu_id
            response['status'] = "Success"

        except ValueError:
            response['status'] = "Invalid Request"
    return JsonResponse(response)


def update_project_invitation_video_details(request, pu_id):
    if request.method == 'PUT':
        project_user = ProjectUserDetails.objects.get(pk=pu_id)
        if project_user:
            project_user_serializer = ProjectUserSerializer(project_user, data=request.data)
            if project_user_serializer.is_valid():
                project_user_serializer.save()
                return Response(project_user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                print('error', project_user_serializer.errors)
                return Response(project_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def update_project_prize(request,pu_id):
    response = {'status': "Invalid Request"}
    if request.method == 'PUT':
        project_user = ProjectUserDetails.objects.get(pk=pu_id)
        if project_user:
            json_data = json.loads(request.body)
            prize_id = json_data["project_id"]
            project_user.prize_given_id = prize_id
            project_user.save()
            response['status'] = "Success"
        else:
            response['status'] = 'Wrong project user reference'
    return JsonResponse(response)








