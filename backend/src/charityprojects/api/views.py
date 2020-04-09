import json
from datetime import date
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import CharityProjects, ProjectUser, ProjectUserDetails, Prize, UserInvitation, UnregisterInvitation,\
    SpreadWord, GiveDonation, LearnNewSkill, DevelopNewHabit, VolunteerTime, Fundraise
from django.http import JsonResponse
from accounts.models import User
from profile.models import ChildProfile
from profile.models import Profile
from .serializers import ProjectUserSerializer, LearnNewSkillSerializer, VolunteerTimeSerializer,\
    DevelopNewHabitSerializer, GiveDonationSerializer, FundraiserSerializer
from rest_framework import status
from rest_framework.response import Response
import re


def charity_project_details(request, project_id):
    response = {'status': "Invalid Request"}
    project = CharityProjects.objects.get(pk=project_id)
    if request.method == "GET":
        try:
            if project:
                response['status'] = "Success"
                response["project_name"] = project.name
                response["project_goal"] = project.goal
                response["project_mission"] = project.mission
                if project.video_name:
                    response["project_video_name"] = project.video_name
                    response["project_video"] = request.build_absolute_uri(project.video.url)
                else:
                    response["project_video_name"] = ""
                    response["project_video"] = ""

                response["project_category"] = project.category
                response["project_tags"] = project.tags
                response["project_badge"] = request.build_absolute_uri(project.badge.url)
                response["project_banner"] = ""
                if project.banner:
                    response["project_banner"] = request.build_absolute_uri(project.banner.url)
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
        project_list.append(project.name)
        response['project_list'] = project_list
    return JsonResponse(response)


def all_project_info_list(request):
    response = {'status': "Success"}
    projects = CharityProjects.objects.all()
    project_list = []
    for project in projects:
        each_project = {"project_id": project.id, "project_name": project.name, "project_goal": project.goal,
                        "project_mission": project.mission,
                        "project_video": request.build_absolute_uri(project.video_name),
                        "project_category": project.category,
                        "project_badge": request.build_absolute_uri(project.badge.url),
                        "project_tags": project.tags, "project_banner": request.build_absolute_uri(project.banner.url)}
        project_list.append(each_project)
    response['project_list'] = project_list
    return JsonResponse(response)


def get_active_project_details(request, user_email):
    response = {'status': "Success"}
    if request.method == 'GET':
        user_id = User.objects.get(email=user_email).id
        project_user_list = ProjectUser.objects.filter(user_id=user_id)
        active_charity_project_list = []
        if len(project_user_list) > 0:
            for project_user in project_user_list:
                if "Challenge" in project_user.challenge_status:
                    project_id = project_user.project_id
                    project = CharityProjects.objects.get(pk=project_id)
                    project_name = project.name
                    project_badge = request.build_absolute_uri(project.badge.url)
                    project_banner = request.build_absolute_uri(project.banner.url)
                    project_mission = project.mission
                    project_category = project.category
                    joined_date = project_user.date_joined
                    challenge_status = project_user.challenge_status
                    project_info = {"project_id": project_id, "project_name": project_name, "project_badge": project_badge,
                                    "project_banner": project_banner, "project_mission": project_mission,
                                    "project_category": project_category,
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
        category_list.append(project.category)
        response['category_list'] = category_list
    return JsonResponse(response)


def start_project(request):
    response = {'status': "Invalid Request"}
    invited_by = ""
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            project_id = json_data["project_id"]
            user = User.objects.get(email=json_data["user_email"])
            if 'invited_by' not in json_data:
                invited_by = ""
            project = CharityProjects.objects.get(pk=project_id)
            user_id = User.objects.get(email=json_data["user_email"]).id
            project_user_records = ProjectUser.objects.filter(project_id=project_id, user_id=user_id)
            if project_user_records.count() > 0:
                for record in project_user_records:
                    purecord_id = record.id
                    response['status'] = "Entry already exists."
                    response['project_status'] = record.project_status
                    project_user_details_records = ProjectUserDetails.objects.filter(project_user_id=purecord_id)
                    for precord in project_user_details_records:
                        if precord.video == "":
                            response['status'] = "No video uploaded. Complete step2 "
                        elif precord.prize_given_id is None:
                            response['status'] = "Select prize for project. Complete step3"
            else:
                project_user = ProjectUser.objects.create(project_id=project_id, user_id=user_id,
                                                          invited_by=invited_by, project_status="PlanningStarted")
                project_user.save()
                project_user_id = project_user.id
                project_user_details = ProjectUserDetails.objects.create(project_user_id=project_user_id)
                project_user_details.save()
                response["pu_id"] = project_user_id
                response['status'] = "Success"
        except ValueError:
            response['status'] = "Invalid Request"
    return JsonResponse(response)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_project_invitation_video_details(request):
    if request.method == 'PUT':
        user_email = request.data["email"]
        project_id = request.data["project_id"]

        user_id = User.objects.get(email=user_email).id #get user id from email id
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]# from project user table get id
        project_user_id = project_user_record.id
        project_user_details = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0]
        project_user_update_data = {"video": request.data["project_video"]}
        # Create new dictionary containing data to update

        if project_user_details:
            project_user_serializer = ProjectUserSerializer(project_user_details, data=project_user_update_data)
            if project_user_serializer.is_valid():
                project_user_serializer.save()
                project_user_record.project_status = "PlanningPhase1"
                project_user_record.save()
                return Response(project_user_serializer.data, status=status.HTTP_201_CREATED)
            else:
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
        project_user_record = ProjectUser.objects.filter(user_id=user_id,project_id=project_id)[0]
        project_user_id = project_user_record.id
        project_user_details = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0]

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
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  #ideally only one entry should be there
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
    new_skill_list['new_skill'] = request.data['new_skill']
    new_skill_list['description'] = request.data['description']
    if 'video' in request.data:
        new_skill_list['video'] = request.data['video']
    project_id = request.data["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # from project user table get id
    if project_user_record:
        project_user_id = project_user_record.id
        new_skill_list['project_user'] = project_user_id
        if 'done' in request.data['save_option']:
            project_user_record.challenge_status = "Challenge3Complete"
            project_user_record.save()
        challenge_skill = LearnNewSkill.objects.filter(project_user_id=project_user_id).first()
        data_serializer = LearnNewSkillSerializer(challenge_skill, data=new_skill_list)
        if data_serializer.is_valid():
            data_serializer.save()
            return Response(data_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0] #ideally only one entry should be there
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
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]
        project_user_id = project_user_record.id
        prize_given_id = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0].prize_given_id
        for email in invited_users:
            if check_existing_project(email, project_id):
                response["status"] = "User is already doing the project"
            if create_user_invitation(email, project_id, user_id, prize_given_id, message):
                response["status"] = "Successfully stored invitation"
            else:
                response["status"] = "User has invitation for this project"

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
        if friend.profile.profile_pic:
            user_photo = request.build_absolute_uri(friend.profile.profile_pic.url)
        else:
            user_photo = ""
        user_details = {"user_id": friend_id, "user_email": friend_email_id, "user_name": user_name,
                        "user_photo": user_photo}
        friend_list.append(user_details)
        children = ChildProfile.objects.filter(parent_id=friend_id)
        if children:
            for child in children:
                child_user_id = child.user_id
                child_profile_object = Profile.objects.get(user_id=child_user_id)
                child_account_object = User.objects.get(pk=child_user_id)
                child_email_id = child_account_object.email
                if child_profile_object.profile_pic:
                    child_photo = request.build_absolute_uri(child_profile_object.profile_pic.url)
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
    children_list = ChildProfile.objects.all()
    for user in user_list:
        if bool(re.match(search_text, user.first_name, re.I)):
            if user.profile.profile_pic:
                user_photo = request.build_absolute_uri(user.profile.profile_pic.url)
            else:
                user_photo = ""
            user_details = {"user_email": user.email, "user_name": user.get_full_name(),
                            "user_photo": user_photo}
            friend_list.append(user_details)
    for child in children_list:

        child_user_id = child.user_id
        child_profile_object = Profile.objects.get(user_id=child_user_id)
        child_account_object = User.objects.get(pk=child_user_id)
        child_email_id = child_account_object.email
        child_name = child_account_object.first_name + child_account_object.last_name
        if child_name.startswith(search_text):
            if child_profile_object.profile_pic:
                child_photo = request.build_absolute_uri(child_profile_object.profile_pic.url)
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
        project_user_id = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0].id
        message = json_data["invitation_message"]
        invited_users = json_data["friend_list"]
        # Remove null, duplicates and own emailId if it exists
        invited_users = [item for item in invited_users if len(item) > 1 and item != user_email_id]
        invited_users = set(invited_users)
        prize_given_id = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0].prize_given_id

        for email in invited_users:
            invited_user = check_user(email)
            if invited_user:
                create_user_invitation(email, project_id, user_id, prize_given_id, message)
            else:
                create_unregister_user_invitation(email, project_user_id, prize_given_id, message)

    return JsonResponse(response)


def create_volunteer_adventure(request, user_id, project_id):
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    if project_user_record:
        project_user_record.challenge_status = "Challenge3Complete"
        project_user_record.save()
    volunteer_time_update_data = {"project_user_id": project_user_id, "organisation_name": request.data["organisation_name"],
                                  "organisation_address": request.data["organisation_address"],
                                  "organisation_city": request.data["organisation_city"],
                                  "organisation_state": request.data["organisation_state"],
                                  "organisation_website": request.data["website"],
                                  "volunteer_hours": request.data["hours"],
                                  "volunteer_work_description": request.data["description"],
                                  "volunteer_exp": request.data["exp_video"]}
    volunteer_serializer = VolunteerTimeSerializer(data=volunteer_time_update_data)
    if volunteer_serializer.is_valid():
        volunteer_serializer.save()
        return Response(volunteer_serializer.data, status=status.HTTP_201_CREATED)
    return Response(volunteer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser])
def volunteer_time(request):
    response = {'status': "Invalid Request"}
    if request.method == "POST":
        store_volunteer_details(request)
    elif request.method == "GET":
        fetch_volunteer_details(request)
    else:
        return JsonResponse(response)


def store_volunteer_details(request):
    user_email_id = request.data["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    action_type = request.data["action_type"]
    if action_type == "Done":
        create_volunteer_adventure(request, user_id, project_id)
        update_challenge_status(user_id, project_id, "Challenge3Complete")
    elif action_type == "Save":
        update_volunteer_details(request)


def fetch_volunteer_details(request):
    user_email_id = request.GET["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.GET["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    volunteer_record = VolunteerTime.objects.get(project_user_id=project_user_id)
    if volunteer_record:
        serializer = VolunteerTimeSerializer(volunteer_record)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


def update_volunteer_details(request):
    user_email_id = request.data["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    volunteer_record = VolunteerTime.objects.get(project_user_id=project_user_id)
    if volunteer_record:
        serializer = VolunteerTimeSerializer(volunteer_record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        create_volunteer_adventure(request, user_id, project_id)


def fetch_project_planning_status(request, user_email):
    response = {'status': "Invalid Request"}
    #json_data = json.loads(request.body)
    user_email_id = user_email
    user_id = User.objects.get(email=user_email_id).id
    project_user_list = ProjectUser.objects.filter(user_id=user_id)
    planning_project_list = []
    if len(project_user_list) > 0:
        for project_user in project_user_list:
            if "Challenge" not in project_user.challenge_status and project_user.project_status:
                project_id = project_user.project_id
                project = CharityProjects.objects.get(pk=project_id)
                project_name = project.name
                project_badge = request.build_absolute_uri(project.badge.url)
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
    new_habit_list['new_habit'] = request.data['new_habit']
    new_habit_list['description'] = request.data['description']
    if 'video' in request.data:
        new_habit_list['video'] = request.data['video']
    project_id = request.data["project_id"]
    new_habit_list['project_id'] = project_id
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # from project user table get id
    if project_user_record:
        project_user_id = project_user_record.id
        new_habit_list['project_user'] = project_user_id
        project_user_record.challenge_status = "Challenge3Complete"
        project_user_record.save()
    data_serializer = DevelopNewHabitSerializer(data=new_habit_list)
    if data_serializer.is_valid():
        data_serializer.save()
        return Response(data_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse(response)


def get_project_invitations(request, user_email):
    response = {'status': "Invalid Request"}
    user_id = User.objects.get(email=user_email).id
    invited_project_user_id_list = UserInvitation.objects.filter(friend_id=user_id, status="Pending")
    invited_project_list = []
    if len(invited_project_user_id_list) > 0:
        for invitation in invited_project_user_id_list:
            project_id = invitation.project_id
            user_id = invitation.user_id
            user = User.objects.get(pk=user_id)
            project = CharityProjects.objects.get(pk=project_id)
            project_name = project.name
            project_badge = request.build_absolute_uri(project.badge.url)
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
    project_user_record = ProjectUser.objects.filter(user_id=inviter_user_id, project_id=project_id)[0]
    project_user_id = project_user_record.id
    project_user_details = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0]
    invitation_video = request.build_absolute_uri(project_user_details.video.url)
    user_invitation = UserInvitation.objects.filter(project_id=project_id, user_id=inviter_user_id, status="Pending")[0]

    invitation_message = user_invitation.invitation_message
    project_invitation = {"user_name": user_name, "message": invitation_message, "video": invitation_video,
                          "project_category": project.category, "project_tags": project.tags,
                          "project_mission": project.mission, "project_goal": project.goal}
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

    user_id = User.objects.get(email=user_email).id
    inviter_user_id = User.objects.get(email=inviter_user_email).id
    project_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=user_id)
    if len(project_user_record) > 0:
        response["status"] = "User has already joined this project"
    else:
        join_date = date.today()
        project_user = ProjectUser.objects.create(project_id=project_id, user_id=user_id, date_joined=join_date,
                                                  invited_by=inviter_user_email, challenge_status="StartChallenge")
        project_user.save()
        project_user_id = project_user.id
        inviter_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=inviter_user_id)[0].id
        prize_given_id = find_user_prize(inviter_user_record)
        project_user_details = ProjectUserDetails.objects.create(project_user_id=project_user_id, prize_given_id=prize_given_id)
        project_user_details.save()
        user_invitation = UserInvitation.objects.filter(project_id=project_id, user_id=inviter_user_id)[0]
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]
    project_user_id = project_user_record.id
    prize_id = find_user_prize(project_user_id)
    project_user_details = ProjectUserDetails.objects.get(project_user_id=project_user_id)
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
            create_unregister_user_invitation(user_email, project_user_id, prize_id, message)

    invited_users = [item for item in registered_user_list if len(item) > 1 and item != user_email]
    invited_users = set(invited_users)
    for user_email in invited_users:
        if check_existing_project(user_email, project_id):
            response["status"] = "User is already doing project"
        else:
            if create_user_invitation(user_email, project_id, user_id, prize_id, message):
                response["status"] = "Successfully stored invitation"
            else:
                response["status"] = "User already has invitation for this project"

    invitee_count = len(unregistered_user_invite) + len(invited_users)
    spread_word = SpreadWord.objects.create(project_user_id=project_user_id, invitee_count=invitee_count)
    spread_word.save()
    response["status"] = "Success"
    return JsonResponse(response)


@api_view(['POST', 'GET', 'PUT'])
@parser_classes([MultiPartParser, FormParser])
def donation(request):
    response = {'status': "Invalid Request"}
    if request.method == "POST":
        store_donation_details(request)
    elif request.method == "GET":
        fetch_donation_details(request)
    else:
        return JsonResponse(response)


def store_donation_details(request):
    user_email_id = request.data["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    action_type = request.data["action_type"]
    if action_type == "Done":
        create_donation_record(request, user_id, project_id)
        update_challenge_status(user_id, project_id, "Challenge3Complete")
    elif action_type == "Save":
        update_donation_details(request)


def create_donation_record(request, user_id, project_id):
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    give_donation_data = {"project_user_id": project_user_id, "organisation_name": request.data["organisation_name"],
                          "organisation_address": request.data["organisation_address"],
                          "organisation_city": request.data["organisation_city"],
                          "organisation_state": request.data["organisation_state"],
                          "organisation_website": request.data["website"],
                          "donation_details": request.data["details"],
                          "donation_exp": request.data["exp_video"]}
    donation_serializer = GiveDonationSerializer(data=give_donation_data)
    if donation_serializer.is_valid():
        donation_serializer.save()
        return Response(donation_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(donation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def update_challenge_status(user_id, project_id,  challenge_status):
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_record.challenge_status = challenge_status
    project_user_record.save()


def fetch_donation_details(request):
    user_email_id = request.GET["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.GET["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    donation_record = GiveDonation.objects.get(project_user_id=project_user_id)
    if donation_record:
        serializer = GiveDonationSerializer(donation_record)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


def update_donation_details(request):
    user_email_id = request.data["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    donation_record = GiveDonation.objects.get(project_user_id=project_user_id)
    if donation_record:
        serializer = GiveDonationSerializer(donation_record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        create_donation_record(request, user_id, project_id)


@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser])
def fundraiser(request):
    response = {'status': "Invalid Request"}
    if request.method == "POST":
        store_fundraiser_details(request)
    elif request.method == "GET":
        fetch_fundraiser(request)
    else:
        return JsonResponse(response)


def store_fundraiser_details(request):
    user_email_id = request.data["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    action_type = request.data["action_type"]
    if action_type == "Done":
        create_fundraiser_record(request, user_id, project_id)
        update_challenge_status(user_id, project_id, "Challenge3Complete")
    elif action_type == "Save":
        update_fundraiser_record(request)


def create_fundraiser_record(request, user_id, project_id):
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    fundraiser_data = {"project_user_id": project_user_id, "organisation_name": request.data["organisation_name"],
                       "organisation_address": request.data["organisation_address"],
                       "organisation_city": request.data["organisation_city"],
                       "organisation_state": request.data["organisation_state"],
                       "organisation_website": request.data["website"],
                       "fundraise_details": request.data["details"],
                       "fundraise_amount": request.data["amount"],
                       "fundraise_exp": request.data["exp_video"]}
    fundraiser_serializer = FundraiserSerializer(data=fundraiser_data)
    if fundraiser_serializer.is_valid():
        fundraiser_serializer.save()
        return Response(fundraiser_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(fundraiser_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def update_fundraiser_record(request):
    user_email_id = request.data["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.data["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    fundraiser_record = Fundraise.objects.get(project_user_id=project_user_id)
    if fundraiser_record:
        serializer = FundraiserSerializer(fundraiser_record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        create_fundraiser_record(request, user_id, project_id)


def fetch_fundraiser(request):
    user_email_id = request.GET["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.GET["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    fundraiser = Fundraise.objects.get(project_user_id=project_user_id)
    if fundraiser:
        serializer = FundraiserSerializer(fundraiser)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


def fetch_completed_projects(request, user_email):
    response = {'status': "Invalid Request"}
    user_id = User.objects.get(email=user_email).id
    project_user_list = ProjectUser.objects.filter(user_id=user_id)
    completed_project_list = []
    if len(project_user_list) > 0:
        for project_user in project_user_list:
            if project_user.challenge_status and project_user.challenge_status == "UnlockedPrize":
                project_id = project_user.project_id
                project = CharityProjects.objects.get(pk=project_id)
                pu_id = project_user.id
                project_badge = request.build_absolute_uri(project.badge.url)
                prize_id = find_user_prize(pu_id)
                prize = Prize.objects.get(pk=prize_id)
                prize_image = request.build_absolute_uri(prize.image.url)
                project_details = {"project_id": project_id, "badge": project_badge, "prize": prize_image}
                completed_project_list.append(project_details)
        response["completed_projects"] = completed_project_list
        response["status"] = "Success"
    else:
        response["status"] = "User has no completed projects"

    return JsonResponse(response)


def spotlight_stats(request, user_email):
    response = {'status': "Invalid Request"}
    total_volunteer_hours = 0
    total_fund_raised = 0
    user_id = User.objects.get(email=user_email).id
    user_invitations = UserInvitation.objects.filter(user_id=user_id)
    total_people_reached = len(user_invitations)
    project_user_list = ProjectUser.objects.filter(user_id=user_id)
    total_projects = len(project_user_list)
    if total_projects > 0:
        for project_user in project_user_list:
            pu_id = project_user.id
            volunteer_adv = VolunteerTime.objects.filter(project_user_id=pu_id)
            if volunteer_adv:
                total_volunteer_hours = total_volunteer_hours + volunteer_adv.volunteer_hours
            fundraiser = Fundraise.objects.filter(project_user_id=pu_id)
            if fundraiser:
                total_fund_raised = total_fund_raised + fundraiser.fundraise_amount

    response["total_projects"] = total_projects
    response["people_reached"] = total_people_reached
    response["volunteer_hours"] = total_volunteer_hours
    response["funds_raised"] = total_fund_raised
    response["status"] = "Success"
    return JsonResponse(response)


def find_user_prize(project_user_id):
    project_user_details = ProjectUserDetails.objects.get(project_user_id=project_user_id)
    prize_given_id = project_user_details.prize_given_id
    return prize_given_id


def create_user_invitation(email, project_id, user_id, prize_id, message):
    invited_user = check_user(email)
    if invited_user:
        invited_user_id = invited_user.id
        invitation_date = date.today()
        invitation_record = UserInvitation.objects.filter(project_id=project_id, friend_id=invited_user_id)
        if invitation_record:
            return False
        else:
            user_invitation = UserInvitation.objects.create(project_id=project_id, user_id=user_id, friend_id=invited_user_id,
                                                            status="Pending", invitation_message=message,
                                                            prize_given_id=prize_id,
                                                            invitation_date=invitation_date)
            user_invitation.save()
            return True
    else:
        return False


def create_unregister_user_invitation(email, project_user_id, prize_id, message):
    unregister_invitation = UnregisterInvitation.objects.create(project_user_id=project_user_id, unregister_user_emailId=email,
                                                                prize_given_id=prize_id, invitation_message=message)
    unregister_invitation.save()


def check_user(email):
    user = User.objects.get(email=email)
    if user:
        return user


def check_existing_project(email, project_id):
    user_id = User.objects.get(email=email).id
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)
    if project_user_record:
        return True
    else:
        return False


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
def get_challenge_learn_new_skill(request, project_id, user_email):
    response = {'status': "Success"}
    if request.method == 'GET':
        user_id = User.objects.get(email=user_email).id
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id).first()
        if project_user_record:
            pu_id = project_user_record.id
            challenge_skill = LearnNewSkill.objects.filter(project_user_id=pu_id).first()
            print(challenge_skill)
            if challenge_skill:
                response['new_skill'] = challenge_skill.new_skill
                response['description'] = challenge_skill.description
                if challenge_skill.video:
                    response['video'] = request.build_absolute_uri(challenge_skill.video.url)
                else:
                    response['video'] = ''
    return JsonResponse(response)
