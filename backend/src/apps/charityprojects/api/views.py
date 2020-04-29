import re
from datetime import date
from django.http import JsonResponse, Http404
from django.utils.timezone import now
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, parser_classes
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from apps.prize.models import Prize
from apps.accounts.models import User
from apps.profile.models import ChildProfile, Profile
from apps.charityprojects.models import CharityProjects, ProjectUser, ProjectUserDetails, UserInvitation, \
    UnregisterInvitation, SpreadWord, GiveDonation, LearnNewSkill, DevelopNewHabit, VolunteerTime, Fundraise, Posts

from apps.accounts.api.serializers import SearchByNameSerializer
from apps.charityprojects.api.serializers import ProjectUserDetailsSerializer, LearnNewSkillSerializer, \
    VolunteerTimeSerializer, DevelopNewHabitSerializer, GiveDonationSerializer, FundraiserSerializer, \
    CharityProjectSerializer, ProjectUserSerializer, ProjectUserNestedSerializer, UserInvitationNestedSerializer


class CustomPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data
        })


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


class ProjectUserMixin(object):

    project_user_record = None
    queryset = ProjectUser.objects.all()

    def get_object(self):
        """
        The method will filter the queryset selected in the child class based on the project id present in the request
        """
        #queryset = self.get_queryset()
        project_id = None
        if self.request.method == 'GET':
            project_id = self.request.GET.get('project_id')
        elif self.request.method == 'PUT' or self.request.method == 'POST':
            project_id = self.request.data['project_id']
        project_user_record = ProjectUser.objects.filter(user_id=self.request.user.id, project_id=project_id).first()
        if project_user_record:
            self.project_user_record = project_user_record
            obj = get_object_or_404(self.queryset, user_id=self.request.user.id, project_id=project_id)
        else:
            raise Http404("Project not started")
        return obj

    def get_project_user_record(self):
        return self.project_user_record

    def find_user_prize(self, project_user_id):
        """
        For a given project find the prize
        :param project_user_id:
        :return: prize id
        """
        project_user_details = ProjectUserDetails.objects.get(project_user_id=project_user_id)
        prize_id = project_user_details.prize_id
        return prize_id


class CharityProjectStartProject(ProjectUserMixin, CreateAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = ProjectUser
    serializer_class = ProjectUserSerializer
    #queryset = ProjectUser.objects.all()

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
        serializer.save(user_id=user_id, project_id=project_id, invited_by="", project_status="PlanningStarted")
        posts_record = Posts.objects.create(user_id=user_id, project_id=project_id, action_type="Started_Project")
        posts_record.save()

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
            if 'create_type' in request.data:
                if request.data['create_type'] == 'invite':
                    self.create_by_invite()
                else:
                    raise Http404("Invalid create type")
            else:
                ProjectUserDetails.objects.create(project_user_id=charity_project.data['id']).save()
            return Response(result, status=status.HTTP_200_OK)
        except ValidationError:
            result["status"] = "Project already in progress"
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        """
        Update the challenges 1 and 2 started by user i.e project exploration and project ideation
        :param serializer:
        """

        project_user_record = self.get_project_user_record()
        challenge_status = project_user_record.challenge_status
        if challenge_status == "StartChallenge":
            join_date = now()
            project_user_record.date_joined = join_date
            project_user_record.challenge_status = "Challenge1Complete"
            project_user_record.save()

        elif challenge_status == "Challenge1Complete":
            if 'adventure_id' not in self.request.data:
                raise Http404("Adventure not selected")
            else:
                adventure_id = self.request.data["adventure_id"]
            if 'goal_date' not in self.request.data:
                raise Http404("Goal date not selected")
            serializer.save(challenge_status = "Challenge2Complete")
            create_adventure_record(project_user_record.id, adventure_id)
            Posts.objects.create(user_id= project_user_record.user_id, project_id=project_user_record.project_id,
                                 action_type="Goal_Set").save()

        elif challenge_status == 'Challenge3Complete':
            project_user_record.challenge_status = "UnlockedPrize"
            project_user_record.save()

    def create_by_invite(self):
        inviter_user_email = self.request.data['inviter_user_email']
        inviter_user_id = User.objects.get(email=inviter_user_email).id
        project_id = self.request.data['project_id']
        join_date = now()
        project_user = ProjectUser.objects.filter(user_id=self.request.user.id, project_id=project_id).first()
        inviter_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=inviter_user_id)
        if inviter_user_record:
            inviter_user_record_id = inviter_user_record[0].id

            project_user.date_joined = join_date
            project_user.invited_by = inviter_user_email
            project_user.challenge_status = "StartChallenge"
            project_user.project_status = ""
            project_user.save()

            project_user_id = project_user.id
            if inviter_user_record:
                inviter_user_record_id = inviter_user_record[0].id
            prize_id = self.find_user_prize(inviter_user_record_id)
            project_user_details = ProjectUserDetails.objects.create(project_user_id=project_user_id,
                                                                     prize_id=prize_id)
            project_user_details.save()
            user_invitation = UserInvitation.objects.filter(project_id=project_id, user_id=inviter_user_id,
                                                            friend_id=self.request.user.id)[0]
            user_invitation.status = "Accepted"
            user_invitation.save()
            Posts.objects.create(project_id=project_id, user_id=inviter_user_id, friend_id=self.request.user.id,
                                 action_type="Joined_Project").save()
        else:
            # TODO - Should delete project_user
            raise Http404()


def create_adventure_record(project_user_id, adventure_id):
    """
    Creates an entry in the respective adventure table using the project user id.
    :param project_user_id:
    :param adventure_id:
    """
    if adventure_id == "1":
        spread_word = SpreadWord.objects.create(project_user_id=project_user_id)
        spread_word.save()
    elif adventure_id == "2":
        learn_new_skill = LearnNewSkill.objects.create(project_user_id=project_user_id)
        learn_new_skill.save()
    elif adventure_id == "3":
        develop_new_habit = DevelopNewHabit.objects.create(project_user_id=project_user_id)
        develop_new_habit.save()
    elif adventure_id == "4":
        volunteer_time = VolunteerTime.objects.create(project_user_id=project_user_id)
        volunteer_time.save()
    elif adventure_id == "5":
        give_donation = GiveDonation.objects.create(project_user_id=project_user_id)
        give_donation.save()
    elif adventure_id == "6":
        fundraiser = Fundraise.objects.create(project_user_id=project_user_id)
        fundraiser.save()


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
        return self.queryset.filter(user=self.request.user, project_status__icontains="Planning", challenge_status__exact='')


class CompletedProjectListView(ProjectListByStatusMixin, ListAPIView):
    def get_queryset(self):
        """
        Method to get projects whose challenge status is in "UnlockedPrize"
        :return: ProjectUserNested serialized data
        """
        return self.queryset.filter(user=self.request.user, challenge_status__icontains="UnlockedPrize")


class UserInvitationListMixin(object):
    """
    The mixin is used to find all the user invitation by the status passed from the Mixin-User
    """
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    serializer_class = UserInvitationNestedSerializer
    queryset = UserInvitation.objects.all().prefetch_related('project').prefetch_related('friend')


class ProjectInvitationsListView(UserInvitationListMixin, ListAPIView):
    def get_queryset(self):
        """
        Method to get project invitation whose status is in "Pending State"
        :return: UserInvitationNested serialized data
        """
        return self.queryset.filter(friend_id=self.request.user.id, status__icontains="Pending")


class ProjectInvitationsView(UserInvitationListMixin, RetrieveAPIView, CreateAPIView):
    def get_object(self):
        queryset = self.get_queryset()
        obj = None
        if self.request.method == 'GET':
            project_id = self.request.GET.get('project_id')
            inviter_user_id = User.objects.get(email=self.request.GET.get('inviter_user_email', None)).id
            if inviter_user_id:
                obj = get_object_or_404(queryset, friend_id=self.request.user.id, project_id=project_id,
                                        user_id=inviter_user_id)
            else:
                raise Http404("No invitation exists")
        return obj


class InviteUserMixin(object):
    prize_id = None
    project_id = None
    message = None
    project_user_id = None

    def clean_data(self, user_list):
        user_list = [item for item in user_list if len(item) > 1 and item != self.request.user.email]
        user_list = set(user_list)
        return user_list

    def check_user(self, email):
        """
           Check whether the user with the given email exists or not
           :param email:
           :return: user
        """
        user = User.objects.filter(email=email)
        if user:
            return user[0]

    def check_existing_project(self, email):
        """
            Check whether there is a record for a given project for a user.
            :param email:
            :param project_id:
            :return: boolean
        """
        user_id = User.objects.get(email=email).id
        project_user_record = ProjectUser.objects.filter(user_id=user_id, project_id=self.project_id)
        if project_user_record:
            return True
        else:
            return False

    def create_user_invitation(self, email):
        """
           This method is used to create an invitation for the user and enter details in user invitation table.
           :param email:
           :return: boolean
        """
        invited_user = self.check_user(email)
        if invited_user:
            invited_user_id = invited_user.id
            invitation_date = date.today()
            invitation_record = UserInvitation.objects.filter(project_id=self.project_id, friend=invited_user_id)
            if invitation_record:
                return False
            else:
                user_invitation = UserInvitation.objects.create(project_id=self.project_id, user_id=self.request.user.id,
                                                                friend_id=invited_user_id,
                                                                status="Pending", invitation_message=self.message,
                                                                prize_id=self.prize_id,
                                                                invitation_date=invitation_date)
                user_invitation.save()
                Posts.objects.create(user_id=invited_user_id, project_id=self.project_id, friend_id=self.request.user.id,
                                     action_type="Received_Invitation").save()
                return True
        else:
            return False

    def create_unregister_user_invitation(self, email):
        """
        Create an invitation record in unregistered user invitation table.
        :param email:
        :return:
        """
        unregister_invitation = UnregisterInvitation.objects.create(project_id=self.project_id,
                                                                    user_id=self.request.user.id,
                                                                    unregister_user_email=email,
                                                                    prize_id=self.prize_id,
                                                                    invitation_message=self.message)
        unregister_invitation.save()

    def check_unregister_existing_project(self, email):
        if UnregisterInvitation.objects.filter(unregister_user_email=email, project_id=self.project_id):
            return True
        return False

    def invite_registered_user(self, invitation_result, user_list):
        for email in user_list:
            invitation_status = ""
            if self.check_existing_project(email):
                invitation_status = "User is already doing the project"
            elif self.create_user_invitation(email):
                invitation_status = "Successfully created invitation"
            else:
                invitation_status = "User has invitation for this project"
            invitation_result.append({"email": email, "status": invitation_status})

    def invite_unregistered_user(self, invitation_result, user_list):
        for email in user_list:
            invitation_status = ""
            invited_user = self.check_user(email)
            if invited_user:
                if self.check_existing_project(email):
                    invitation_status = "User is already doing the project"
                elif self.create_user_invitation(email):
                    invitation_status = "Successfully created invitation"
                else:
                    invitation_status = "User has invitation for this project"
            else:
                if self.check_unregister_existing_project(email):
                    invitation_status = "User is already doing the project"
                else:
                    self.create_unregister_user_invitation(email)
                    invitation_status = "Successfully send mail to unregistered user"
            invitation_result.append({"email": email, "status": invitation_status})


class InviteUser(ProjectUserMixin, InviteUserMixin, APIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {'status': "Invalid Request"}
        invitation_result = []
        project_user_record = super().get_object()
        self.project_id = request.data["project_id"]
        self.message = request.data["invitation_message"]
        self.project_user_id = project_user_record.id
        self.prize_id = ProjectUserDetails.objects.filter(project_user_id=self.project_user_id)[0].prize_id

        self.invite_registered_user(invitation_result, self.clean_data(request.POST.getlist('registered_user')))
        self.invite_unregistered_user(invitation_result, self.clean_data(request.POST.getlist('unregistered_user')))

        project_user_record.project_status = "PlanningPhase3"
        project_user_record.challenge_status = "StartChallenge"
        project_user_record.save()
        response["status"] = "Success"
        response["invitation_result"] = invitation_result
        return Response(response, status=status.HTTP_200_OK)


class SearchFriendByEmailView(ListAPIView):
    pagination_class = CustomPagination
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    serializer_class = SearchByNameSerializer
    queryset = User.objects.all().prefetch_related('profile').order_by('id')

    def get_queryset(self):
        search = self.request.GET.get('email')
        return self.queryset.filter(email__icontains=search) | self.queryset.filter(id__in=self.get_child_id_list(search))

    def get_child_id_list(self, email):
        child_id_list = []
        try:
            parent_id = User.objects.get(email=email).id
            children = ChildProfile.objects.filter(parent_id=parent_id)
            for child in children:
                child_id_list.append(child.user_id)
            return child_id_list
        except Exception:
            return child_id_list


class SearchFriendByNameView(ListAPIView):
    pagination_class = CustomPagination
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    serializer_class = SearchByNameSerializer
    queryset = User.objects.all().prefetch_related('profile').order_by('id')

    def get_queryset(self):
        search = self.request.GET.get('text')
        search = re.sub(' +', ' ', search)
        search_params = search.split()
        if len(search_params) == 1:
            return self.queryset.filter(first_name__istartswith=search_params[0])
        else:
            return self.queryset.filter(first_name__istartswith=search_params[0], last_name__istartswith=search_params[1])


class ChallengeSpreadTheWord(ProjectUserMixin, InviteUserMixin, APIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {'status': "Invalid Request"}
        invitation_result = []

        project_user_record = super().get_object()
        self.project_user_id = project_user_record.id
        self.prize_id = self.find_user_prize(self.project_user_id)
        project_user_details = ProjectUserDetails.objects.get(project_user_id=self.project_user_id)
        if "video" in request.data:
            project_user_details.video = request.data["video"]
            project_user_details.save()

        self.project_id = request.data["project_id"]
        self.message = request.data["invitation_message"]

        registered_user = self.clean_data(request.data["registered_user"])
        unregistered_user = self.clean_data(request.data["unregistered_user"])

        self.invite_registered_user(invitation_result, registered_user)
        self.invite_unregistered_user(invitation_result, unregistered_user)

        invitee_count = len(unregistered_user) + len(registered_user)
        spread_word = SpreadWord.objects.create(project_user_id=self.project_user_id, invitee_count=invitee_count)
        spread_word.save()
        response["status"] = "Success"
        return Response(response, status=status.HTTP_200_OK)


def spotlight_stats(request, user_email):
    """
    This method is used to find the statistics for user activities to be displayed on the spotlight page.
    :param request:
    :param user_email:
    :return:
    """
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


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
def user_feed(request):
    """
    This api will gather information about different activities performed by the user to display on his/her feed.
    :param request:
    :return: list of map of with details of user actions
    """
    response = {'status': "Success"}
    user_email_id = request.GET["user_email"]
    user = User.objects.get(email=user_email_id)
    user_id = user.id
    user_actions = Posts.objects.filter(user_id=user_id)
    feed_list = []
    adventure_map = {1: "Spread the word", 2: "Learn a new skill", 3: "Develop a new habit", 4: "Volunteer",
                     5: "Give a donation", 6: "Raise funds"}
    if len(user_actions) > 0:
        for record in user_actions:
            action_type = record.action_type
            project_id = record.project_id
            project = CharityProjects.objects.get(pk=project_id)
            if action_type == "Started_Project":
                user = User.objects.get(pk=record.user_id)
                profile = Profile.objects.get(user_id=record.user_id)
                if profile.profile_pic:
                    profile_pic = request.build_absolute_uri(profile.profile_pic.url)
                else:
                    profile_pic = ''
                project_badge = request.build_absolute_uri(project.badge.url)
                user_name = user.first_name+' '+user.last_name
                project_details = {"project_name": project.name, "project_badge": project_badge, "time": record.date,
                                   "user_name": user_name, "profile_pic": profile_pic,
                                   "action": "Started_Project"}
                feed_list.append(project_details)
            elif action_type == "Completed_Project":
                user = User.objects.get(pk=record.user_id)
                profile = Profile.objects.get(user_id=record.user_id)
                if profile.profile_pic:
                    profile_pic = request.build_absolute_uri(profile.profile_pic.url)
                else:
                    profile_pic = ' '
                project_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=user_id).first()
                pu_id = project_user_record.id
                adventure_id = project_user_record.adventure_id
                adventure_video = find_adventure_record(request, adventure_id, pu_id)
                user_name = user.first_name + ' ' + user.last_name
                project_details = {"project_name": project.name, "adventure_experience": adventure_video,
                                   "time": record.date, "user_name": user_name,
                                   "profile_pic": profile_pic, "action": "Completed_Project"}
                feed_list.append(project_details)
            elif action_type == "Goal_Set":
                user = User.objects.get(pk=record.user_id)
                profile = Profile.objects.get(user_id=record.user_id)
                if profile.profile_pic:
                    profile_pic = request.build_absolute_uri(profile.profile_pic.url)
                else:
                    profile_pic = ' '
                project_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=user_id).first()
                adventure_id = project_user_record.adventure_id
                goal_date = project_user_record.goal_date
                adventure_name = adventure_map[adventure_id]
                user_name = user.first_name + ' ' + user.last_name
                project_details = {"project_name": project.name, "goal_name": adventure_name, "goal_date": goal_date,
                                   "user_name": user_name, "profile_pic": profile_pic,
                                   "time": record.date, "action": "Goal_Set"}
                feed_list.append(project_details)
            elif action_type == "Received_Invitation":
                friend = User.objects.get(pk=record.friend_id)
                friend_name = friend.first_name + ' ' + friend.last_name
                friend_profile = Profile.objects.get(user_id=record.friend_id)
                if friend_profile.profile_pic:
                    friend_image = request.build_absolute_uri(friend_profile.profile_pic.url)
                else:
                    friend_image = ''
                project_banner = request.build_absolute_uri(project.banner.url)
                invitation_details = {"project_name": project.name, "project_mission": project.mission,
                                      "project_banner": project_banner, "friend_name": friend_name,
                                      "time": record.date, "friend_profile_pic": friend_image,
                                      "gender": friend.gender, "project_id": project.id,
                                      "friend_email": friend.email, "action": "Received_Invitation"}
                feed_list.append(invitation_details)
            elif action_type == "Joined_Project":
                friend = User.objects.get(pk=record.friend_id)
                friend_name = friend.first_name + ' ' + friend.last_name
                friend_profile = Profile.objects.get(user_id=record.friend_id)
                if friend_profile.profile_pic:
                    friend_image = request.build_absolute_uri(friend.profile.profile_pic.url)
                else:
                    friend_image = ''
                project_badge = request.build_absolute_uri(project.banner.url)
                joining_details = {"project_name": project.name, "friend_name": friend_name,
                                   "friend_profile_pic": friend_image, "time": record.date,
                                   "project_badge": project_badge, "action": "Joined_Project"}
                feed_list.append(joining_details)
            elif action_type == "Friend_Goal_Set":
                friend = User.objects.get(pk=record.friend_id)
                friend_name = friend.first_name + ' ' + friend.last_name
                friend_profile = Profile.objects.get(user_id=record.friend_id)
                if friend_profile.profile_pic:
                    friend_image = request.build_absolute_uri(friend.profile.profile_pic.url)
                else:
                    friend_image = ''
                project_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=friend.id).first()
                if project_user_record:
                    adventure_id = project_user_record.adventure_id
                    adventure_name = adventure_map[adventure_id]
                else:
                    adventure_name = ''
                project_details = {"project_name": project.name, "friend_name": friend_name,
                                   "friend_profile_pic": friend_image, "time": record.date,
                                   "goal_name": adventure_name, "action": "Friend_Goal_Set"}
                feed_list.append(project_details)
            elif action_type == "Friend_Completed_Project":
                friend = User.objects.get(pk=record.friend_id)
                friend_name = friend.first_name + ' ' + friend.last_name
                friend_profile = Profile.objects.get(user_id=record.friend_id)
                if friend_profile.profile_pic:
                    friend_image = request.build_absolute_uri(friend.profile.profile_pic.url)
                else:
                    friend_image = ''
                project_user_record = ProjectUser.objects.filter(project_id=project_id, user_id=friend.id).first()
                if project_user_record:
                    pu_id = project_user_record.id
                    adventure_id = project_user_record.adventure_id
                    adventure_video = find_adventure_record(request, adventure_id, pu_id)
                else:
                    adventure_video = ''
                project_details = {"project_name": project.name, "adventure_experience": adventure_video,
                                   "time": record.date, "friend_name": friend_name,
                                   "profile_pic": friend_image, "action": "Friend_Completed_Project"}
                feed_list.append(project_details)
        feed_list.sort(key=lambda k: k['time'], reverse=True)
    response["feed_list"] = feed_list
    response["Status"] = "Success"
    return JsonResponse(response)


def find_adventure_record(request, adventure_id, project_user_id):
    """
    This method finds the adventure record for a given project and user and returns the associated adventure experience video
    :param request:
    :param adventure_id:
    :param project_user_id:
    :return: Experience video
    """
    if adventure_id == 1:
        spread_word = SpreadWord.objects.filter(project_user_id=project_user_id)
        project_user_details = ProjectUserDetails.objects.filter(project_user_id=project_user_id).first()
        if project_user_details:
            if project_user_details.video:
                return request.build_absolute_uri(project_user_details.video.url)
            else:
                return ''
    elif adventure_id == 2:
        learn_new_skill = LearnNewSkill.objects.filter(project_user_id=project_user_id).first()
        if learn_new_skill:
            if learn_new_skill.video:
                return request.build_absolute_uri(learn_new_skill.video.url)
            else:
                return ''
    elif adventure_id == 3:
        develop_new_habit = DevelopNewHabit.objects.filter(project_user_id=project_user_id).first()
        if develop_new_habit:
            if develop_new_habit.video:
                return request.build_absolute_uri(develop_new_habit.video.url)
            else:
                return ''
    elif adventure_id == 4:
        volunteer_time = VolunteerTime.objects.filter(project_user_id=project_user_id).first()
        if volunteer_time:
            if volunteer_time.volunteer_exp:
                return request.build_absolute_uri(volunteer_time.volunteer_exp.url)
            else:
                return ''
    elif adventure_id == 5:
        give_donation = GiveDonation.objects.filter(project_user_id=project_user_id).first()
        if give_donation:
            if give_donation.donation_exp:
                return request.build_absolute_uri(give_donation.donation_exp.url)
            else:
                return ''
    elif adventure_id == 6:
        fundraiser = Fundraise.objects.filter(project_user_id=project_user_id).first()
        if fundraiser:
            if fundraiser.fundraise_exp:
                return request.build_absolute_uri(fundraiser.fundraise_exp.url)
            else:
                return ''


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
                        project_id=project_id, user_id=user_id).values()
                    if unregister_invitation:
                        for item in unregister_invitation:
                            invitees.append(item['unregister_user_emailId'])
                    if spread_word_pu_id == pu_id:
                        registered_invitation = UserInvitation.objects.filter(project_id=project_id,
                                                                              user_id=user_id).values()
                        if registered_invitation:
                            for item in registered_invitation:
                                print(item)
                                user = User.objects.get(id=item['friend_id'])
                                invitees.append(user.email)
                    response['invitees'] = invitees
                    if project_user_details_record.video:
                        response['video'] = request.build_absolute_uri(project_user_details_record.video.url)
                    else:
                        response['video'] = ''
        posts_record = Posts.objects.create(user_id=user_id, project_id=project_id, action_type="Completed_Project")
        posts_record.save()
    return JsonResponse(response)


class QueryByProjectUserMixin(object):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

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
        project_user_record = ProjectUser.objects.filter(user_id=self.request.user.id, project_id=project_id)[0]
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

    def set_project_joining_date(self, date):
        """
        Method to update project user joined date
        :param date: date
        """
        self.project_user_record.date_joined = date
        self.project_user_record.save()

    def set_project_goal_date(self, date):
        """

        Method yo update project user goal date
        :param date:
        """
        self.project_user_record.goal_date = date
        self.project_user_record.save()


class ChallengeLearNewSkillView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    """
    This is the views for adventure Learn new skill. Updates and gets the adventure details
    """
    model = LearnNewSkill
    serializer_class = LearnNewSkillSerializer
    queryset = LearnNewSkill.objects.all()

    def perform_update(self, serializer):
        """
        The method updates project challenge status based on action_type.
        :param serializer:
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'done' in self.request.data['action_type']:
                self.set_project_challenge_status("Challenge3Complete")


class StartProject(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
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
        if project_status == "PlanningStarted":
            if 'video' not in self.request.data:
                raise Http404("Video not provided")
            status_to_set = "PlanningPhase1"
        # So the project is in step-1 going to step-2
        elif project_status == "PlanningPhase1":
            if 'prize' not in self.request.data:
                raise Http404("Prize not provided")
            status_to_set = "PlanningPhase2"
        else:
            raise Http404("Query Error")

        if status_to_set is None:
            raise Http404("Invalid Status")
        else:
            super().perform_update(serializer)
            self.set_project_status(status_to_set)


class ChallengeVolunteerTimeDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    """
    This is the views for adventure Volunteer time. Updates and gets the adventure details
    """
    model = VolunteerTime
    serializer_class = VolunteerTimeSerializer
    queryset = VolunteerTime.objects.all()

    def perform_update(self, serializer):
        """
        Update the volunteer time enntry based on action type
        :param serializer:
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'Done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")


class ChallengeDevelopNewHabitDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    """
    This is the views for adventure Develop new habit. Updates and gets the adventure details
    """
    model = DevelopNewHabit
    serializer_class = DevelopNewHabitSerializer
    queryset = DevelopNewHabit.objects.all()

    def perform_update(self, serializer):
        """
        The method updates project challenge status based on action_type.
        :param serializer:
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")


class ChallengeGiveDonationDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    """
    This is the views for adventure Give donation. Updates and gets the adventure details
    """
    model = GiveDonation
    serializer_class = GiveDonationSerializer
    queryset = GiveDonation.objects.all()

    def perform_update(self, serializer):
        """
        Update the give donation entry based on action type
        :param serializer:
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'Done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")


class ChallengeFundraiserDetailsView(QueryByProjectUserMixin, RetrieveAPIView, UpdateAPIView):
    """
    This is the views for adventure fundraiser. Updates and gets the adventure details
    """
    model = Fundraise
    serializer_class = FundraiserSerializer
    queryset = Fundraise.objects.all()

    def perform_update(self, serializer):
        """
        Update the fundraiser entry based on action type
        :param serializer:
        """
        super().perform_update(serializer)
        if 'action_type' in self.request.data:
            if 'Done' in self.request.data['action_type']:
                self.set_project_user_record_status("Challenge3Complete")
