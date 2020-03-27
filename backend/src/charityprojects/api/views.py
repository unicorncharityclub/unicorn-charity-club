import json
from datetime import date
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import CharityProjects, ProjectUser, ProjectUserDetails, Prize, UserInvitation, UnregisterInvitation, SpreadWord
from django.http import JsonResponse
from accounts.models import User
from myaccount.models import ChildAccount
from myaccount.models import Myaccount
from .serializers import ProjectUserSerializer, LearnNewSkillSerializer, VolunteerTimeSerializer, DevelopNewHabitSerializer
from rest_framework import status
from rest_framework.response import Response
import re

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


def get_active_project_details(request, user_emailid):
    response = {'status': "Success"}
    if request.method == 'GET':
        user_id = User.objects.get(email=user_emailid).id
        project_user_list = ProjectUser.objects.filter(user_id_id=user_id)
        active_charity_project_list = []
        if len(project_user_list) > 0:
            for project_user in project_user_list:
                if project_user.project_status == "PlanningPhase3":
                    project_id = project_user.project_id_id
                    project = CharityProjects.objects.get(pk=project_id)
                    project_name = project.Name
                    project_badge = request.build_absolute_uri(project.Badge.url)
                    project_banner = request.build_absolute_uri(project.Banner.url)
                    joined_date = project_user.date_joined
                    challenge_status = project_user.challenge_status
                    project_info = {"project_id": project_id, "project_name": project_name, "project_badge": project_badge,
                                    "project_banner": project_banner,
                                    "project_join_date": joined_date, "challenge_status": challenge_status}
                    active_charity_project_list.append(project_info)
            response['active_project_list'] = active_charity_project_list
            response['status'] = "Success"
        else:
            response["status"] = "User has no active projects"
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
                                                          invited_by=invited_by, project_status="PlanningStarted")
                project_user.save()
                print("Created new record")
                pu_id = project_user.id
                project_user_details = ProjectUserDetails.objects.create(pu_id=pu_id)
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
                project_user_record.project_status = "PlanningPhase1"
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
        project_user_record = ProjectUser.objects.filter(user_id_id=user_id,
                                        project_id_id=project_id)[0]
        pu_id = project_user_record.id
        project_user_details = ProjectUserDetails.objects.filter(pu_id_id=pu_id)[0]

        if project_user_details:
            project_user_details.prize_given_id = Prize.objects.get(pk=prize_id)
            project_user_details.save()
            project_user_record.project_status = "PlanningPhase2"
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
    new_skill_list = {}
    user_email_id = request.data["email"]
    user_id = User.objects.get(email=user_email_id).id
    new_skill_list['newSkill'] = request.data['newSkill']
    new_skill_list['description'] = request.data['description']
    if 'video' in request.data:
        new_skill_list['video'] = request.data['video']
    project_id = request.data["projectId"]
    project_user_record = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0]  # from project user table get id
    if project_user_record:
        pu_id = project_user_record.id
        new_skill_list['pu_id'] = pu_id
        project_user_record.challenge_status = "Challenge3Complete"
        project_user_record.save()
    data_serializer = LearnNewSkillSerializer(data=new_skill_list)
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
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id_id=project_id)[0]
        project_user_id = project_user_record.id
        prize_given_id = ProjectUserDetails.objects.filter(pu_id_id=project_user_id)[0].prize_given_id_id
        for email in invited_users:
            if create_user_invitation(email, project_user_id, prize_given_id, message):
                response["status"] = "Successfully stored invitation"
            else:
                response["status"] = "Requested user does not exist"

        project_user_record.project_status = "PlanningPhase3"
        project_user_record.challenge_status = "StartChallenge"
        project_user_record.save()
        return JsonResponse(response)


def get_friend_list(request):
    response = {'status': "Invalid Request"}
    friend_list = []
    json_data = json.loads(request.body)
    friend_email_id = json_data["friend_email"]
    friend = User.objects.get(email=friend_email_id.lower())
    friend_id = friend.id
    if friend_id:
        user_name = friend.first_name + " " + friend.last_name
        if friend.myaccount.ProfilePic:
            user_photo = request.build_absolute_uri(friend.myaccount.ProfilePic.url)
        else:
            user_photo = ""
        user_details = {"user_id": friend_id, "user_email": friend_email_id, "user_name": user_name,
                        "user_photo": user_photo}
        friend_list.append(user_details)
        children = ChildAccount.objects.filter(ParentId_id=friend_id)
        if children:
            for child in children:
                child_user_id = child.user_id
                child_profile_object = Myaccount.objects.get(user_id=child_user_id)
                child_account_object = User.objects.get(pk=child_user_id)
                child_email_id = child_account_object.email
                if child_profile_object.ProfilePic:
                    child_photo = request.build_absolute_uri(child_profile_object.ProfilePic.url)
                else:
                    child_photo = ""
                child_name = child_account_object.first_name + child_account_object.last_name
                child_details = {"user_id": child.id, "user_email": child_email_id, "user_name": child_name,
                                 "user_photo": child_photo}
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
    offset = offset*10
    user_list = User.objects.all()
    children_list = ChildAccount.objects.all()
    for user in user_list:
        if bool(re.match(search_text, user.first_name, re.I)):
            if user.myaccount.ProfilePic:
                user_photo = request.build_absolute_uri(user.myaccount.ProfilePic.url)
            else:
                user_photo = ""
            user_details = {"user_email": user.email, "user_name": user.get_full_name(),
                            "user_photo": user_photo}
            friend_list.append(user_details)
    for child in children_list:

        child_user_id = child.user_id
        child_profile_object = Myaccount.objects.get(user_id=child_user_id)
        child_account_object = User.objects.get(pk=child_user_id)
        child_email_id = child_account_object.email
        child_name = child_account_object.first_name + child_account_object.last_name
        if child_name.startswith(search_text):
            if child_profile_object.ProfilePic:
                child_photo = request.build_absolute_uri(child_profile_object.ProfilePic.url)
            else:
                child_photo = ""
            child_details = {"user_email": child_email_id, "user_name": child_name,
                             "user_photo": child_photo} # Check with child account what dummy email to use
            friend_list.append(child_details)
    if len(friend_list) == 0:
        response["status"] = "No user exists with the search name"
    # assuming first offset to be 0, then 11 and so on. Return 0 to 10, then 11to 20...
    else:
        for i in range(len(friend_list)):
            result.append(friend_list[i])
        response["status"] = 'Success'
        response["friend_list"] = result

    return JsonResponse(response)


def unregistered_invitation(request):
    response = {'status': "Invalid Request"}
    if request.method == 'POST':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id
        project_id = json_data["project_id"]
        project_user_id = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0].id
        message = json_data["invitation_message"]
        invited_users = json_data["friend_list"]
        # Remove null, duplicates and own emailId if it exists
        invited_users = [item for item in invited_users if len(item) > 1 and item != user_email_id]
        invited_users = set(invited_users)
        prize_given_id = ProjectUserDetails.objects.filter(pu_id_id=project_user_id)[0].prize_given_id_id

        for email in invited_users:
            invited_user = check_user(email)
            if invited_user:
                create_user_invitation(email, project_user_id, prize_given_id, message)
            else:
                create_unregister_user_invitation(email, project_user_id, prize_given_id, message)

    return JsonResponse(response)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_volunteer_adventure(request):
    user_email_id = request.data["user_email"]
    print(user_email_id)
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0]  # ideally only one entry should be there
    pu_id = project_user_record.id
    if project_user_record:
        project_user_record.challenge_status = "Challenge3Complete"
        project_user_record.save()
    volunteer_time_update_data = {"pu_id": pu_id, "organisation_name": request.data[" organisation_name"],
                                  "organisation_address": request.data[" organisation_address"],
                                  " organisation_city": request.data[" organisation_city"],
                                  "organisation_state": request.data[" organisation_state"],
                                  "organisation_website": request.data["website"],
                                  "volunteer_hours": request.data["hours"],
                                  "volunteer_work_description": request.data["description"],
                                  "volunteer_exp": request.data["exp_video"]}
    volunteer_serializer = VolunteerTimeSerializer(data=volunteer_time_update_data)
    if volunteer_serializer.is_valid():
        volunteer_serializer.save()
        return Response(volunteer_serializer.data, status=status.HTTP_201_CREATED)
    return Response(volunteer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def fetch_project_planning_status(request, user_emailid):
    response = {'status': "Invalid Request"}
    #json_data = json.loads(request.body)
    user_email_id = user_emailid
    user_id = User.objects.get(email=user_email_id).id
    project_user_list = ProjectUser.objects.filter(user_id=user_id)
    planning_project_list = []
    if len(project_user_list) > 0:
        for project_user in project_user_list:
            if "Challenge" not in project_user.challenge_status and project_user.project_status:
                project_id = project_user.project_id_id
                project = CharityProjects.objects.get(pk=project_id)
                project_name = project.Name
                project_badge = request.build_absolute_uri(project.Badge.url)
                start_date = project_user.date_started
                planning_status = project_user.project_status
                project_info = {"project_id": project_id, "project_name": project_name, "project_badge": project_badge,
                                "project_start_date": start_date, "planning_status": planning_status}
                planning_project_list.append(project_info)
        response["project_list"] = planning_project_list
        response["status"] = "Success"
    else:
        response["status"] = "User has not started planning any projects"

    return JsonResponse(response)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def challenge_develop_new_habit(request):
    response = {'status': "Success"}
    new_habit_list = {}
    user_email_id = request.data["email"]
    user_id = User.objects.get(email=user_email_id).id
    new_habit_list['newHabit'] = request.data['newHabit']
    new_habit_list['description'] = request.data['description']
    if 'video' in request.data:
        new_habit_list['video'] = request.data['video']
    project_id = request.data["projectId"]
    new_habit_list['projectId'] = project_id
    project_user_record = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0]  # from project user table get id
    if project_user_record:
        pu_id = project_user_record.id
        new_habit_list['pu_id'] = pu_id
        project_user_record.challenge_status = "Challenge3Complete"
        project_user_record.save()
    data_serializer = DevelopNewHabitSerializer(data=new_habit_list)
    if data_serializer.is_valid():
        data_serializer.save()
        return Response(data_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('error', data_serializer.errors)
        return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    print(request.data)

    return JsonResponse(response)


def get_project_invitations(request, user_emailid):
    response = {'status': "Invalid Request"}
    user_id = User.objects.get(email=user_emailid).id
    invited_project_user_id_list = UserInvitation.objects.filter(friend_id=user_id, status="Pending")
    invited_project_list = []
    if len(invited_project_user_id_list) > 0:
        for invitation in invited_project_user_id_list:
            pu_id = invitation.pu_id_id
            project_user_record = ProjectUser.objects.get(pk=pu_id)
            project_id = project_user_record.project_id_id
            user_id = project_user_record.user_id_id
            user = User.objects.get(pk=user_id)
            project = CharityProjects.objects.get(pk=project_id)
            project_name = project.Name
            project_badge = request.build_absolute_uri(project.Badge.url)
            inviter_name = user.get_full_name()
            invitation_date = invitation.invitation_date
            invitation_details = {"inviter_user_email": user.email, "inviter_user_name": inviter_name, "project_id": project_id, "project_name": project_name,
                                  "project_badge": project_badge, "invitation_date": invitation_date } #invitation date has to be updated
            invited_project_list.append(invitation_details)
        response["invited_project_list"] = invited_project_list
        response["status"] = "Success"
    else:
        response["status"] = "User has no project invitation"

    return JsonResponse(response)


def fetch_project_invitation_details(request):
    response = {'status': "Invalid Request"}

    #json_data = json.loads(request.body)
    #project_id = json_data["project_id"]
    #invited_user_email = json_data["user_email"]
    #inviter_user_email = json_data["inviter_user_email"]

    # take url parametes like this
    # as get request does not send data in json
    project_id = request.GET['project_id']
    invited_user_email = request.GET['user_email']
    inviter_user_email = request.GET['inviter_user_email']

    inviter_user_id = User.objects.get(email=inviter_user_email).id
    invited_user = User.objects.get(email=invited_user_email)
    user_id = invited_user.id
    user_name = invited_user.get_full_name()
    project = CharityProjects.objects.get(pk=project_id)
    project_user_record = ProjectUser.objects.filter(user_id_id=inviter_user_id, project_id_id=project_id)[0]
    pu_id = project_user_record.id
    project_user_details = ProjectUserDetails.objects.filter(pu_id_id=pu_id)[0]
    invitation_video = request.build_absolute_uri(project_user_details.video.url)
    user_invitation = UserInvitation.objects.filter(pu_id_id=pu_id, status="Pending")[0]
    print(user_invitation)
    invitation_message = user_invitation.invitation_message
    project_invitation = {"user_name": user_name, "message": invitation_message, "video": invitation_video,
                          "project_category": project.Category, "project_tags": project.Tags,
                          "project_Mission": project.Mission, "project_goal": project.Goal}
    response["invitation_details"] = project_invitation
    response["status"] = "Success"
    return JsonResponse(response)


def join_project_invitation(request):
    response = {'status': "Invalid Request"}

    # json_data = json.loads(request.body)
    # project_id = json_data["project_id"]
    # user_email = json_data["user_email"]
    # inviter_user_email = json_data["inviter_user_email"]

    project_id = request.GET['project_id']
    user_email = request.GET['user_email']
    inviter_user_email = request.GET['inviter_user_email']

    print(project_id, user_email, inviter_user_email)

    user_id = User.objects.get(email=user_email).id
    inviter_user_id = User.objects.get(email=inviter_user_email).id
    project_user_record = ProjectUser.objects.filter(project_id_id=project_id, user_id_id=user_id)
    if len(project_user_record) > 0:
        response["status"] = "User has already joined this project"
    else:
        project_user = ProjectUser.objects.create(project_id=project_id, user_id=user_id,
                                                  invited_by=inviter_user_email, challenge_status="StartChallenge")
        project_user.save()
        pu_id = project_user.id
        inviter_user_record = ProjectUser.objects.filter(project_id_id=project_id, user_id_id=inviter_user_id)[0].id
        prize_given_id = find_user_prize(inviter_user_record)
        project_user_details = ProjectUserDetails.objects.create(pu_id=pu_id, prize_given_id=prize_given_id)
        project_user_details.save()
        user_invitation = UserInvitation.objects.filter(pu_id_id=inviter_user_record)[0]
        user_invitation.status = "Accepted"
        user_invitation.save()
        response["status"] = "Success"
    return JsonResponse(response)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def spread_the_word(request):
    response = {'status': "Invalid Request"}
    project_id = request.data["project_id"]
    user_email = request.data["user_email"]
    message = request.data["invite_message"]
    user_id = User.objects.get(email=user_email).id
    project_user_record = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0]
    pu_id = project_user_record.id
    prize_id = find_user_prize(pu_id)
    project_user_details = ProjectUserDetails.objects.get(pu_id_id=pu_id)
    if "video" in request.data:
        project_user_details.video = request.data["video"]
        project_user_details.save()

    registered_user_list = request.data["registered_user"]
    unregistered_user_list = request.data["unregistered_user"]

    unregistered_user_invite = [item for item in unregistered_user_list if len(item) > 1 and item != user_email]
    unregistered_user_invite = set(unregistered_user_invite)
    for user_email in unregistered_user_invite:
        invited_user = User.objects.get(email=user_email)
        if invited_user:
            registered_user_list.append(invited_user)
        else:
            create_unregister_user_invitation(user_email, pu_id, prize_id, message)

    invited_users = [item for item in registered_user_list if len(item) > 1 and item != user_email]
    invited_users = set(invited_users)
    for user_email in invited_users:
        if check_existing_project(user_email, project_id):
            response["status"] = "User is already doing project"
        else:
            if create_user_invitation(user_email, pu_id, prize_id, message):
                response["status"] = "Successfully stored invitation"

    invitee_count = len(unregistered_user_invite) + len(invited_users)
    spread_word = SpreadWord.objects.create(pu_id_id=pu_id, invitee_count=invitee_count)
    spread_word.save()
    response["status"] = "Success"
    return JsonResponse(response)


def find_user_prize(pu_id):
    project_user_details = ProjectUserDetails.objects.get(pu_id_id=pu_id)
    prize_given_id = project_user_details.prize_given_id_id
    return prize_given_id


def create_user_invitation(email, pu_id, prize_id, message):
    invited_user = check_user(email)
    if invited_user:
        invited_user_id = invited_user.id
        invitation_date = date.today()
        user_invitation = UserInvitation.objects.create(pu_id_id=pu_id, friend_id=invited_user_id,
                                                        status="Pending",
                                                        invitation_message=message,
                                                        prize_given_id_id=prize_id,
                                                        invitation_date=invitation_date)
        user_invitation.save()
        return True
    else:
        return False


def create_unregister_user_invitation(email, pu_id, prize_id, message):
    unregister_invitation = UnregisterInvitation.objects.create(pu_id_id=pu_id, unregister_user_emailId=email,
                                                                prize_given_id_id=prize_id, invitation_message=message)
    unregister_invitation.save()


def check_user(email):
    user = User.objects.get(email=email)
    if user:
        return user


def check_existing_project(email, project_id):
    user_id = User.objects.get(email=email).id
    project_user_record = ProjectUser.objects.filter(user_id_id=user_id, project_id_id=project_id)[0]
    if project_user_record:
        return True
    else:
        return False
