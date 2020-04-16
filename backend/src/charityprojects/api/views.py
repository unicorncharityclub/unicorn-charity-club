import json
from datetime import date

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, parser_classes
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from ..models import CharityProjects, ProjectUser, ProjectUserDetails, Prize, UserInvitation, UnregisterInvitation, \
    SpreadWord, GiveDonation, LearnNewSkill, DevelopNewHabit, VolunteerTime, Fundraise
from prize.models import Prize

from django.http import JsonResponse, Http404
from accounts.models import User
from profile.models import ChildProfile
from profile.models import Profile
from .serializers import ProjectUserDetailsSerializer, LearnNewSkillSerializer, VolunteerTimeSerializer, \
    DevelopNewHabitSerializer, GiveDonationSerializer, FundraiserSerializer, CharityProjectSerializer, \
    ProjectUserSerializer, ProjectUserNestedSerializer, UserInvitationNestedSerializer
from rest_framework import status
from rest_framework.response import Response
import re


class CharityProjectDetailsView(RetrieveAPIView):
    """
    The primary key for the Charity Projects is passed from URL.py
    Based on the PK and the serializer mentioned the data is returned in JSON format
    """
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = CharityProjects
    serializer_class = CharityProjectSerializer
    queryset = CharityProjects.objects.all()


class CharityProjectListView(ListAPIView):
    """
    The ListAPIView will use the model and the serializer provided.
    Based on the queryset it will return all the result from the DB
    Currently no pagination is in place
    """
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = CharityProjects
    serializer_class = CharityProjectSerializer
    queryset = CharityProjects.objects.all()


class CharityProjectCategory(ListAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        :return: From the model the distinct category will be retrieved and returned in JSON
        """
        result = {'category_list': list(
            CharityProjects.objects.order_by('category').values_list('category', flat=True).distinct())}
        return Response(result, status=status.HTTP_200_OK)


class CharityProjectStartProject(CreateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = ProjectUser
    serializer_class = ProjectUserSerializer

    def perform_create(self, serializer):
        """
        Before create method being called this overridden method will be used to pass some extra data to save method
        Step 1 - check if the charity project is already on going. If yes return message
        Step 2 - else it will use the CreateAPIView and create the entry in ProjectUser table
        :param serializer:
        :return:
        """
        project_id = int(self.request.data['project_id'])
        user_id = int(self.request.user.id)
        queryset = ProjectUser.objects.filter(project_id=project_id, user_id=user_id)
        if queryset.exists():
            raise ValidationError('Project already in progress')
        serializer.save(user_id=user_id, project_id=project_id,invited_by="", project_status="PlanningStarted")

    def post(self, request, *args, **kwargs):
        """
        Step 1 - Create entry in the ProjectUser table
        Step 2 - In successful step 1 - Create entry in ProjectUserDetails table
        :param request: will contain the project_id which needs to be started
        :return: json response containing status of successful or existing project status
        """
        result = {}
        try:
            result["status"] = "Success"
            charity_project = super().post(request, *args, **kwargs)
            ProjectUserDetails.objects.create(project_user_id=charity_project.data['id']).save()
            return Response(result, status=status.HTTP_200_OK)
        except ValidationError:
            result["status"] = "Project already in progress"
            return Response(result, status=status.HTTP_400_BAD_REQUEST)


def all_project_list(request):
    response = {'status': "Success"}
    project_list = []
    projects = CharityProjects.objects.all()
    for project in projects:
        project_list.append(project.name)
        response['project_list'] = project_list
    return JsonResponse(response)


class ProjectListByStatusMixin(object):
    """
    The mixin is used to find all the projects by the status passed from the Mixin-User
    """
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectUserNestedSerializer
    queryset = ProjectUser.objects.all().prefetch_related('project')


class ActiveProjectListView(ProjectListByStatusMixin, ListAPIView):
    def get_queryset(self):
        """
        Method to get projects whose status is in "Challenge State"
        :return: ProjectUserNested serialized data
        """
        return self.queryset.filter(user=self.request.user, challenge_status__icontains="Challenge")


class PlannedProjectListView(ProjectListByStatusMixin, ListAPIView):
    def get_queryset(self):
        """
        Method to get projects whose status is in "Planning State"
        :return: ProjectUserNested serialized data
        """
        return self.queryset.filter(user=self.request.user, project_status__icontains="Planning")


class UserInvitationListMixin(object):
    """
    The mixin is used to find all the user invitation by the status passed from the Mixin-User
    """
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    serializer_class = UserInvitationNestedSerializer
    queryset = UserInvitation.objects.all().prefetch_related('project').prefetch_related('user')


class ProjectInvitationsListView(UserInvitationListMixin, ListAPIView):
    def get_queryset(self):
        """
        Method to get project invitation whose status is in "Pending State"
        :return: UserInvitationNested serialized data
        """
        return self.queryset.filter(user=self.request.user, status__icontains="Pending")


def update_project_challenge_status_explore(request):
    response = {'status': "Invalid Request"}
    if request.method == 'PUT':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id
        project_id = json_data["project_id"]
        project_join_date = json_data["joining_date"]
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
            0]  # ideally only one entry should be there
        if project_user_record:
            project_user_record.date_joined = project_join_date
            project_user_record.challenge_status = "Challenge1Complete"
            project_user_record.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def update_project_challenge_status_ideation(request):
    response = {'status': "Invalid Request"}
    if request.method == 'PUT':
        json_data = json.loads(request.body)
        user_email_id = json_data["user_email"]
        user_id = User.objects.get(email=user_email_id).id
        project_id = json_data["project_id"]
        project_goal_date = json_data["goal_date"]
        adventure_id = json_data["adv_id"]
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
            0]  # ideally only one entry should be there
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
        # Remove null, duplicates and own emailId if it exists
        invited_users = [item for item in invited_users if len(item) > 1 and item != user_email_id]
        invited_users = set(invited_users)
        message = json_data["invitation_message"]
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[0]
        project_user_id = project_user_record.id
        prize_id = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0].prize_id
        for email in invited_users:
            if check_existing_project(email, project_id):
                response["status"] = "User is already doing the project"
            if create_user_invitation(email, project_id, user_id, prize_id, message):
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
    offset = offset * 10
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
                             "user_photo": child_photo}  # Check with child account what dummy email to use
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
        prize_id = ProjectUserDetails.objects.filter(project_user_id=project_user_id)[0].prize_id

        for email in invited_users:
            invited_user = check_user(email)
            if invited_user:
                create_user_invitation(email, project_id, user_id, prize_id, message)
            else:
                create_unregister_user_invitation(email, project_user_id, prize_id, message)

    return JsonResponse(response)


def create_volunteer_adventure(request, user_id, project_id):
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    if project_user_record:
        project_user_record.challenge_status = "Challenge3Complete"
        project_user_record.save()
    volunteer_time_update_data = {"project_user": project_user_id, "organisation_name": request.data["organisation_name"],
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
    #return Response(volunteer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser])
def volunteer_time(request):
    response = {'status': "Invalid Request"}
    if request.method == "POST":
        store_volunteer_details(request)
    elif request.method == "GET":
        fetch_volunteer_details(request)
    return Response(status=status.HTTP_200_OK)


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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    volunteer_record = VolunteerTime.objects.filter(project_user_id=project_user_id)[0]
    volunteer_time_update_data = {"project_user": project_user_id,
                                  "organisation_name": request.data["organisation_name"],
                                  "organisation_address": request.data["organisation_address"],
                                  "organisation_city": request.data["organisation_city"],
                                  "organisation_state": request.data["organisation_state"],
                                  "organisation_website": request.data["website"],
                                  "volunteer_hours": request.data["hours"],
                                  "volunteer_work_description": request.data["description"],
                                  "volunteer_exp": request.data["exp_video"]}
    if volunteer_record:
        serializer = VolunteerTimeSerializer(volunteer_record, data=volunteer_time_update_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        create_volunteer_adventure(request, user_id, project_id)


def fetch_project_invitation_details(request):
    response = {'status': "Invalid Request"}
    # json_data = json.loads(request.body)
    # project_id = json_data["project_id"]
    # invited_user_email = json_data["user_email"]
    # inviter_user_email = json_data["inviter_user_email"]

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
        prize_id = find_user_prize(inviter_user_record)
        project_user_details = ProjectUserDetails.objects.create(project_user_id=project_user_id,
                                                                 prize_id=prize_id)
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
    response = {'status': "Success"}
    if request.method == "POST":
        store_donation_details(request)
    elif request.method == "GET":
        fetch_donation_details(request)
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    give_donation_data = {"project_user": project_user_id, "organisation_name": request.data["organisation_name"],
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


def update_challenge_status(user_id, project_id, challenge_status):
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_record.challenge_status = challenge_status
    project_user_record.save()


def fetch_donation_details(request):
    user_email_id = request.GET["user_email"]
    user_id = User.objects.get(email=user_email_id).id
    project_id = request.GET["project_id"]
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    donation_record = GiveDonation.objects.get(project_user_id=project_user_id)
    give_donation_update_data = {"project_user": project_user_id, "organisation_name": request.data["organisation_name"],
                                 "organisation_address": request.data["organisation_address"],
                                 "organisation_city": request.data["organisation_city"],
                                 "organisation_state": request.data["organisation_state"],
                                 "organisation_website": request.data["website"],
                                 "donation_details": request.data["details"],
                                 "donation_exp": request.data["exp_video"]}
    if donation_record:
        serializer = GiveDonationSerializer(donation_record, data=give_donation_update_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        create_donation_record(request, user_id, project_id)


@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser])
def fundraiser(request):
    response = {'status': "Success"}
    if request.method == "POST":
        store_fundraiser_details(request)
    elif request.method == "GET":
        fetch_fundraiser(request)
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    fundraiser_data = {"project_user": project_user_id, "organisation_name": request.data["organisation_name"],
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
    project_user_id = project_user_record.id
    fundraiser_record = Fundraise.objects.get(project_user_id=project_user_id)
    fundraiser_data = {"project_user": project_user_id, "organisation_name": request.data["organisation_name"],
                       "organisation_address": request.data["organisation_address"],
                       "organisation_city": request.data["organisation_city"],
                       "organisation_state": request.data["organisation_state"],
                       "organisation_website": request.data["website"],
                       "fundraise_details": request.data["details"],
                       "fundraise_amount": request.data["amount"],
                       "fundraise_exp": request.data["exp_video"]}
    if fundraiser_record:
        serializer = FundraiserSerializer(fundraiser_record, data=fundraiser_data)
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
    project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id)[
        0]  # ideally only one entry should be there
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
            if VolunteerTime.objects.filter(project_user_id=pu_id).exists():
                volunteer_adv = VolunteerTime.objects.get(project_user_id=pu_id)
                if volunteer_adv:
                    total_volunteer_hours = total_volunteer_hours + volunteer_adv.volunteer_hours
            if Fundraise.objects.filter(project_user_id=pu_id).exists():
                fundraiser = Fundraise.objects.get(project_user_id=pu_id)
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
    prize_id = project_user_details.prize_id
    return prize_id


def create_user_invitation(email, project_id, user_id, prize_id, message):
    invited_user = check_user(email)
    if invited_user:
        invited_user_id = invited_user.id
        invitation_date = date.today()
        invitation_record = UserInvitation.objects.filter(project_id=project_id, friend=invited_user_id)
        if invitation_record:
            return False
        else:
            user_invitation = UserInvitation.objects.create(project_id=project_id, user_id=user_id,
                                                            friend=invited_user_id,
                                                            status="Pending", invitation_message=message,
                                                            prize_id=prize_id,
                                                            invitation_date=invitation_date)
            user_invitation.save()
            return True
    else:
        return False


def create_unregister_user_invitation(email, project_user_id, prize_id, message):
    unregister_invitation = UnregisterInvitation.objects.create(project_user_id=project_user_id,
                                                                unregister_user_emailId=email,
                                                                prize_id=prize_id, invitation_message=message)
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
def unlock_prize(request, project_id, user_email):
    response = {'status': "Success"}
    if request.method == 'GET':
        user_id = User.objects.get(email=user_email).id
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=project_id).first()
        if project_user_record:
            pu_id = project_user_record.id
            project_user_details_record = ProjectUserDetails.objects.filter(project_user_id=pu_id).first()
            if project_user_details_record:
                prize_id = project_user_details_record.prize_id
                prize_details = Prize.objects.filter(id=prize_id).first()
                if prize_details:
                    response['image'] = request.build_absolute_uri(prize_details.image.url)
            adventure_id = project_user_record.adventure_id
            response['adventure_id'] = adventure_id
            if adventure_id == 1:
                invitees = []
                challenge_spread_word = SpreadWord.objects.filter(project_user_id=pu_id).first()
                if challenge_spread_word:
                    spread_word_pu_id = challenge_spread_word.project_user_id
                    unregister_invitation = UnregisterInvitation.objects.filter(
                        project_user_id=spread_word_pu_id).values()
                    if unregister_invitation:
                        for item in unregister_invitation:
                            invitees.append(item['unregister_user_emailId'])
                    if spread_word_pu_id == pu_id:
                        registered_invitation = UserInvitation.objects.filter(project_id=project_id,
                                                                              user_id=user_id).values()
                        if registered_invitation:
                            for item in registered_invitation:
                                user = User.objects.get(id=item['friend'])
                                invitees.append(user.email)
                    response['invitees'] = invitees
                    if project_user_details_record.video:
                        response['video'] = request.build_absolute_uri(project_user_details_record.video.url)
                    else:
                        response['video'] = ''
            elif adventure_id == 2:
                challenge_skill = LearnNewSkill.objects.filter(project_user_id=pu_id).first()
                if challenge_skill:
                    response['new_skill'] = challenge_skill.new_skill
                    response['description'] = challenge_skill.description
                    if challenge_skill.video:
                        response['video'] = request.build_absolute_uri(challenge_skill.video.url)
                    else:
                        response['video'] = ''
            elif adventure_id == 3:
                challenge_develop_habit = DevelopNewHabit.objects.filter(project_user_id=pu_id).first()
                if challenge_develop_habit:
                    response['new_habit'] = challenge_develop_habit.new_habit
                    response['description'] = challenge_develop_habit.description
                    if challenge_develop_habit.video:
                        response['video'] = request.build_absolute_uri(challenge_develop_habit.video.url)
                    else:
                        response['video'] = ''
            elif adventure_id == 4:
                challenge_voluteer_time = VolunteerTime.objects.filter(project_user_id=pu_id).first()
                if challenge_voluteer_time:
                    response['organisation_name'] = challenge_voluteer_time.organisation_name
                    response['organisation_address'] = challenge_voluteer_time.organisation_address
                    response['organisation_city'] = challenge_voluteer_time.organisation_city
                    response['organisation_state'] = challenge_voluteer_time.organisation_state
                    response['organisation_website'] = challenge_voluteer_time.organisation_website
                    response['volunteer_hours'] = challenge_voluteer_time.volunteer_hours
                    response['volunteer_work_description'] = challenge_voluteer_time.volunteer_work_description
                    if challenge_voluteer_time.volunteer_exp:
                        response['video'] = request.build_absolute_uri(challenge_voluteer_time.volunteer_exp.url)
                    else:
                        response['video'] = ''
            elif adventure_id == 5:
                challenge_give_donation = GiveDonation.objects.filter(project_user_id=pu_id).first()
                if challenge_give_donation:
                    response['organisation_name'] = challenge_give_donation.organisation_name
                    response['organisation_address'] = challenge_give_donation.organisation_address
                    response['organisation_city'] = challenge_give_donation.organisation_city
                    response['organisation_state'] = challenge_give_donation.organisation_state
                    response['organisation_website'] = challenge_give_donation.organisation_website
                    if challenge_give_donation.donation_exp:
                        response['video'] = request.build_absolute_uri(challenge_give_donation.volunteer_exp.url)
                    else:
                        response['video'] = ''
            elif adventure_id == 6:
                challenge_fundraise = Fundraise.objects.filter(project_user_id=pu_id).first()
                if challenge_fundraise:
                    response['organisation_name'] = challenge_fundraise.organisation_name
                    response['organisation_address'] = challenge_fundraise.organisation_address
                    response['organisation_city'] = challenge_fundraise.organisation_city
                    response['organisation_state'] = challenge_fundraise.organisation_state
                    response['organisation_website'] = challenge_fundraise.organisation_website
                    response['fundraise_details'] = challenge_fundraise.fundraise_details
                    if challenge_fundraise.fundraise_exp:
                        response['video'] = request.build_absolute_uri(challenge_fundraise.fundraise_exp.url)
                    else:
                        response['video'] = ''
    return JsonResponse(response)


class QueryByProjectUserMixin(object):
    def __init__(self):
        self.project_user_record = None

    def get_object(self):
        """
        The method will filter the queryset selected in the child class based on the project id present in the request
        """
        queryset = self.get_queryset()
        project_id = None
        if self.request.method == 'GET':
            project_id = self.request.GET.get('project_id')
        elif self.request.method == 'PUT':
            project_id = self.request.data['project_id']
        project_user_record = ProjectUser.objects.filter(user_id=self.request.user.id, project_id=project_id).first()
        if project_user_record:
            self.project_user_record = project_user_record
            obj = get_object_or_404(queryset, project_user_id=project_user_record.id)
        else:
            raise Http404("Project not started")
        return obj

    def get_project_user_record(self):
        return self.project_user_record

    def set_project_user_record_status(self, status):
        self.project_user_record.challenge_status = status
        self.project_user_record.save()

    def set_project_challenge_status(self, status):
        """
        Method to update the Project User challenge status.
        :param status:
        """
        self.project_user_record.challenge_status = status
        self.project_user_record.save()

    def set_project_status(self, status):
        """
        Method to update the Project User project status.
        :param status:
        """
        self.project_user_record.project_status = status
        self.project_user_record.save()


class ChallengeLearNewSkillView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = LearnNewSkill
    serializer_class = LearnNewSkillSerializer
    queryset = LearnNewSkill.objects.all()

    def perform_update(self, serializer):
        """
        :param serializer:
        The method after updating the LearnNewSkill, based on action_type, project challenge status will be updated.
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'done' in self.request.data['action_type']:
                self.set_project_challenge_status("Challenge3Complete")


class StartProject(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = ProjectUserDetails
    serializer_class = ProjectUserDetailsSerializer
    queryset = ProjectUserDetails.objects.all()

    def perform_update(self, serializer):
        """
        Based on the current status the update will move from Phase0 to Phase1 or from Phase1 to Phase2.
        :param serializer:
        """
        project_user_record = self.get_project_user_record()
        status_to_set = None
        project_status = project_user_record.project_status
        # So the project is in step-0 going to step-1
        if project_status is None or len(project_status) == 0:
            if 'video' not in self.request.data:
                raise Http404("Video not provided")
            status_to_set = "PlanningPhase1"

        # So the project is in step-1 going to step-2
        elif project_status == "PlanningPhase1":
            if 'prize' not in self.request.data:
                raise Http404("Prize not provided")
            status_to_set = "PlanningPhase2"

        if status_to_set is None:
            raise Http404("Invalid Status")
        else:
            super().perform_update(serializer)
            self.set_project_status(status_to_set)


class ChallengeVolunteerTimeDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = VolunteerTime
    serializer_class = VolunteerTimeSerializer
    queryset = VolunteerTime.objects.all()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'Done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")



class ChallengeDevelopNewHabitDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = DevelopNewHabit
    serializer_class = DevelopNewHabitSerializer
    queryset = DevelopNewHabit.objects.all()

    def perform_update(self, serializer):
        """
        :param serializer:
        The method after updating the DevelopNewHabit, based on action_type, project challenge status will be updated.
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")

class ChallengeGiveDonationDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = GiveDonation
    serializer_class = GiveDonationSerializer
    queryset = GiveDonation.objects.all()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'Done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")


class ChallengeFundraiserDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = Fundraise
    serializer_class = FundraiserSerializer
    queryset = Fundraise.objects.all()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'Done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")

