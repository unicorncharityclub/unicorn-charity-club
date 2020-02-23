import json
from ..models import CharityProjects
from django.http import JsonResponse


def charity_project_details(request, project_id):
    response = {'status':"Invalid Request"}
    project = CharityProjects.objects.get(pk=project_id)
    if request.method == "GET":
        try:
            if project:
                response['status'] = "Success"
                response[" project_name"] = project.Name
                response["project_goal"] = project.Goal
                response["project_mission"] = project.Mission
                response["project_video"] = project.Video_Name
                response["project_category"] = project.Category
                response["project_tags"] = project.Tags
                response["project_banner"] = project.Banner.url
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


def project_category(request):
    response = {'status': "Success"}
    category_list = []
    projects = CharityProjects.objects.all()
    for project in projects:
        category_list.append(project.Category)
        response['category_list'] = category_list
    return JsonResponse(response)





