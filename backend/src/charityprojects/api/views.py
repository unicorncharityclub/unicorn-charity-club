import json

from pip._vendor.pyparsing import Char
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import CharityProjects, ProjectUser, ProjectUserDetails, Prize, UserInvitation
from django.http import JsonResponse
from accounts.models import User
from childAccount.models import ChildAccount
from myaccount.models import Myaccount
from .serializers import ProjectUserSerializer, LearnNewSkillSerializer
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
                if project.Video_Name:
                    response["project_video_name"] = project.Video_Name
                    response["project_video"] = request.build_absolute_uri(project.Video.url)
                else:
                    response["project_video_name"] = ""
                    response["project_video"] = ""

                response["project_category"] = project.Category
                response["project_tags"] = project.Tags
                response["project_badge"] = request.build_absolute_uri(project.Badge.url)
                response["project_banner"] = ""
                if project.Banner:
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
        each_project = {"project_id": project.id, "project_name": project.Name, "project_goal": project.Goal,
                        "project_mission": project.Mission,
                        "project_video": request.build_absolute_uri(project.Video_Name),
                        "project_category": project.Category,
                        "project_badge": request.build_absolute_uri(project.Badge.url),
                        "project_tags": project.Tags, "project_banner": request.build_absolute_uri(project.Banner.url)}
        project_list.append(each_project)
    print(project_list)
    response['project_list'] = project_list
    return JsonResponse(response)

@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
def getActiveProjectList(request, user_emailid):
    response = {'status': "Success"}
    if request.method == 'GET':
        user_id = User.objects.get(email=user_emailid).id
        all_projects = ProjectUser.objects.filter(user_id_id=user_id)
        charityProjectList = []

        project_id_list = set()
        for project in all_projects:
            project_id = project.project_id_id
            project_id_list.add(project_id)

        for project_id in project_id_list:
            project = CharityProjects.objects.get(pk=project_id)
            each_project = {"project_id": project.id, "project_name": project.Name, "project_goal": project.Goal,
                            "project_mission": project.Mission,
                            "project_video": request.build_absolute_uri(project.Video_Name),
                            "project_category": project.Category,
                            "project_badge": request.build_absolute_uri(project.Badge.url),
                            "project_tags": project.Tags,
                            "project_banner": request.build_absolute_uri(project.Banner.url)}
            charityProjectList.append(each_project)
    response['active_project_list'] = charityProjectList
    return JsonResponse(response)



def project_category(request):
    response = {'status': "Success"}
    category_list = []
    projects = CharityProjects.objects.all()
    for project in projects:
        category_list.append(project.Category)
        response['category_list'] = category_list
    return JsonResponse(response)


def start_project(request):
    response = {'status': "Invalid Request"}
    invited_by = ""
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            project_id = json_data["project_id"]
            user = User.objects.get(email=json_data["user_emailid"])
            if 'invited_by' not in json_data:
                invited_by = ""
            project = CharityProjects.objects.get(pk=project_id)
            user_id = User.objects.get(email=json_data["user_emailid"]).id
            project_user_records = ProjectUser.objects.filter(project_id_id=project_id, user_id_id=user_id)
            if project_user_records.count() > 0:
                for record in project_user_records:
                    purecord_id = record.id
                    print(record.project_status)
                    response['status'] = "Entry already exists."
                    response['project_status'] = record.project_status
                    project_user_details_records = ProjectUserDetails.objects.filter(pu_id=purecord_id)
                    for precord in project_user_details_records:
                        if precord.video == "":
                            response['status'] = "No video uploaded. Complete step2 "
                        elif precord.prize_given_id is None:
                            response['status'] = "Select prize for project. Complete step3"
            else:
                project_user = ProjectUser.objects.create(project_id=project, user_id=user,
                                                                  invited_by=invited_by, project_status="PlanningPhase1")
                project_user.save()
                print("Created new record")
                pu_id = project_user.id
                project_user_details = ProjectUserDetails.objects.create(pu_id=project_user)
                project_user_details.save()
                response["pu_id"] = pu_id
                response['status'] = "Success"
        except ValueError:
            response['status'] = "Invalid Request"
    print(response)
    return JsonResponse(response)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_project_invitation_video_details(request):
    if request.method == 'PUT':
        user_emailid = request.data["Email"]
        project_id = request.data["ProjectId"]

        user_id = User.objects.get(email=user_emailid).id #get user id from email id
        project_user_record = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0]# from project user table get id
        pu_id = project_user_record.id
        project_user_details = ProjectUserDetails.objects.filter(pu_id=pu_id)[0]
        project_user_update_data = {"video": request.data["ProjectVideo"]}
        # Create new dictionary containing data to update

        if project_user_details:
            project_user_serializer = ProjectUserSerializer(project_user_details, data=project_user_update_data)
            if project_user_serializer.is_valid():
                project_user_serializer.save()
                project_user_record.project_status = "PlanningPhase2"
                project_user_record.save()
                return Response(project_user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                print('error', project_user_serializer.errors)
                return Response(project_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
# @parser_classes([MultiPartParser, FormParser])
def update_project_prize(request):
    response = {'status': "Invalid Request"}
    if request.method == 'PUT':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id  # get user id from email id
        project_id = json_data["project_id"]
        prize_id = json_data["prize_id"]
        project_user_record = ProjectUser.objects.filter(user_id=user_id,
                                        project_id_id=project_id)[0]
        pu_id = project_user_record.id
        project_user_details = ProjectUserDetails.objects.filter(pu_id=pu_id)[0]

        if project_user_details:
            project_user_details.prize_given_id = Prize.objects.get(pk=prize_id)
            project_user_details.save()
            project_user_record.project_status = "PlanningPhase3"
            project_user_record.save()
            response['status'] = "Success"
        else:
            response['status'] = 'Wrong project user reference'
    return JsonResponse(response)


def update_project_challenge_status_explore(request):
    response = {'status': "Invalid Request"}
    if request.method == 'PUT':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id
        project_id = json_data["project_id"]
        project_join_date = json_data["joining_date"]
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id_id=project_id)[0] #ideally only one entry should be there
        if project_user_record:
            project_user_record.date_joined = project_join_date
            project_user_record.challenge_status = "Challenge1Complete"
            project_user_record.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def challenge_learn_new_skill(request):
    response = {'status': "Success"}
    lst = {}
    lst['newSkill'] = request.data['newSkill']
    lst['description'] = request.data['description']
    lst['video'] = request.data['video']
    lst['pu_id'] = request.data["ProjectId"]
    data_serializer = LearnNewSkillSerializer(data=lst)
    if data_serializer.is_valid():
        data_serializer.save()
        return Response(data_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('error', data_serializer.errors)
        return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    print(request.data)

    return JsonResponse(response)


def update_project_challenge_status_ideation(request):
    response = {'status': "Invalid Request"}
    if request.method == 'PUT':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id
        project_id = json_data["project_id"]
        project_goal_date = json_data["goal_date"]
        adventure_id = json_data["adv_id"]
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id_id=project_id)[0] #ideally only one entry should be there
        if project_user_record:
            project_user_record.goal_date = project_goal_date
            project_user_record.challenge_status = "Challenge2Complete"
            project_user_record.adventure_id = adventure_id
            project_user_record.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def update_user_invitation(request):
    response = {'status': "Invalid Request"}
    if request.method == 'POST':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id
        project_id = json_data["project_id"]
        invited_users = json_data["friend_list"]
        #Remove null, duplicates and own emailId if it exists
        invited_users = [item for item in invited_users if len(item)>1 and item!=user_email_id]
        invited_users = set(invited_users)
        message = json_data["invitation_message"]
        project_user_id = ProjectUser.objects.filter(user_id=user_id, project_id_id=project_id)[0].id
        prize_given_id = ProjectUserDetails.objects.filter(pu_id_id=project_user_id)[0].prize_given_id_id

        print("prize_given_id", prize_given_id)
        print("user_id", user_id)
        print("project_id", project_id)
        print("invited_users", invited_users)
        print("message", message)
        print("project_user_id", project_user_id)

        for email in invited_users:
            invited_user = User.objects.get(email=email)
            if invited_user:
                invited_user_id = invited_user.id
                user_invitation = UserInvitation.objects.create(pu_id_id=project_user_id,
                                                        friend_id=invited_user_id, status="Pending",
                                                        invitation_message= message, prize_given_id_id=prize_given_id)
                user_invitation.save()
            else:
                response = {'status': "Requested user does not exist"}

        return JsonResponse(response)


def get_friend_list(request):
    response = {'status': "Invalid Request"}
    friend_list = []
    json_data = json.loads(request.body)
    friend_email_id = json_data["friend_email"]
    friend = User.objects.get(email=friend_email_id)
    friend_id = friend.id
    if friend_id:
        user_name = friend.first_name + " " + friend.last_name
        if friend.myaccount.ProfilePic:
            print(Myaccount.objects.get(pk=friend_id).ProfilePic)
            user_photo = request.build_absolute_uri(Myaccount.objects.get(pk=friend_id).ProfilePic)
        else:
            user_photo = ""
        user_details = {"user_id": friend_id, "user_email": friend_email_id, "user_name": user_name,
                        "user_photo": user_photo}
        friend_list.append(user_details)
        children = ChildAccount.objects.filter(UserId_id=friend_id)
        if children:
            for child in children:
                child_email_id = User.objects.get(id=child.id).email
                child_details = {"user_id": child.id, "user_email": child_email_id, "user_name": child.Name,
                                 "user_photo": request.build_absolute_uri(child.Photo)}
                friend_list.append(child_details)
            response["status"] = "Success"
        else:
            response["status"] = "User has no child added"
        response["friend_list"] = friend_list
    else:
        response["status"] = "User does not exist"
    return JsonResponse(response)


def search_friends(request):
    response = {'status': "Invalid Request"}
    friend_list = []
    result = []
    json_data = json.loads(request.body)
    search_text = json_data["text"]
    offset = json_data["offset_value"]
    user_list = User.objects.all()
    children_list = ChildAccount.objects.all()
    for user in user_list:
        if user.first_name.startswith(search_text):
            user_details = {"user_email": user.email, "user_name": user.first_name,
                            "user_photo": request.build_absolute_uri(user.myaccount.ProfilePic)}
            friend_list.append(user_details)
    for child in children_list:
        if child.Name.startswith(search_text):
            child_details = {"user_email": "abc@gmail.com", "user_name": child.Name,
                             "user_photo": request.build_absolute_uri(child.Photo)} # Check with child account what dummy email to use
            friend_list.append(child_details)
    if len(friend_list) == 0:
        response["status"] = "No user exists with the search name"
    # assuming first offset to be 0, then 11 and so on. Return 0 to 10, then 11to 20...
    else:
        for i in range(offset, offset+10):
            result.append(friend_list[i])
        response["status"] = 'Success'
        response["friend_list"] = result

    return JsonResponse(response)


    print(response)
    return JsonResponse(response)




