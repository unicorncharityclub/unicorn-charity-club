import string
import random

from django.contrib.auth import login, logout
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.profile.api.serializers import ProfileSerializer, ChildProfileSerializer
from apps.profile.api.views import ChildrenListMixin
from apps.profile.models import Profile, ChildProfile
from apps.accounts.models import User
from apps.accounts.api.serializers import AccountDetailsSerializer

child_email_id_extension = "@ucc.child.com"


def random_string(string_length=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


class UserRegisterMixin(object):
    """
    Register new user to the application
    """
    def post(self, data, *args, **kwargs):
        response_data = {"status": "Success"}
        serializer = AccountDetailsSerializer(data=data, context={'password': make_password(data['password'])})
        serializer.is_valid()
        if serializer.is_valid:
            try:
                serializer.save()
            except Exception:
                response_data['status'] = "User Already Exist"
        else:
            response_data['status'] = "Invalid Request"
        return Response(response_data, status=status.HTTP_200_OK)


class UserRegistrationView(UserRegisterMixin, APIView):
    """
     Register new user to the application

    **Returns**
    201 Success.
    """
    def post(self, request, *args, **kwargs):
        return super().post(request.data)


class UserLoginView(ChildrenListMixin, APIView):
    """
    Login registered user to the application

    **Returns**
    200 Success.

    """
    authentication_classes = (SessionAuthentication,)

    @method_decorator(csrf_exempt)
    def post(self, request, *args, **kwargs):
        """
        Login registered user to the application
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        try:
            response = {'status': "Invalid Request"}
            user_details_list = []
            user = authenticate(username=request.data["email"], password=request.data["password"])
            if not user:
                response['status'] = "Incorrect email or password."
                return Response(response, status=status.HTTP_200_OK)

            if not user.is_active:
                response['status'] = "User is disabled."
                return Response(response, status=status.HTTP_200_OK)

            login(request, user)
            profile_serializer = ProfileSerializer(Profile.objects.get(user_id=user.id), context={'request': request})
            parent_user_data = profile_serializer.data
            parent_user_data.update(AccountDetailsSerializer(user).data)
            user_details_list.append(parent_user_data)
            kwargs.update({"user_email": user.email})
            # Calling parent function and adding child details
            children_data = super().get(self, request, *args, **kwargs).data["child_list"]
            for child in children_data:
                user_details_list.append(child)

            response['status'] = "Success"
            response['user_list'] = user_details_list
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AddChildView(UserRegisterMixin, APIView):
    """
    Add child for the parent user

    **Context**
    An instance of :model:`accounts.User`

    **Returns**
    201 Success.
    """
    def post(self, request, *args, **kwargs):
        """
        Add children for the parent user
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        try:

            parent_user = request.user
            parent_user_id = parent_user.id
            child_name = request.data['first_name']
            child_name = child_name.replace(" ", "")
            child_user_email = parent_user.email.split("@")[0] + "." + child_name + "." \
                               + random_string(10) + child_email_id_extension
            random_password = random_string(20)

            child_data = {'first_name': request.POST['first_name'], 'last_name': request.POST['last_name'],
                          'dob': request.POST['dob'], 'email': child_user_email, 'password': random_password}

            super().post(child_data)

            child_user_id = User.objects.get(email=child_user_email).id
            # Updating user profile details
            profile = Profile.objects.get(user_id=child_user_id)
            profile_serializer = ProfileSerializer(profile, data=request.data)
            if profile_serializer.is_valid():
                profile_serializer.save()

            # Creating child profile
            data = {"user": child_user_id, "parent": parent_user_id,
                    "school": request.data["school"], "school_grade": request.data["school_grade"]}
            serializer = ChildProfileSerializer(data=data)
            if serializer.is_valid():
                serializer.save()

        except (User.DoesNotExist, Exception):
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Success'})


class UserSwitchAccountView(APIView):
    """
    Switch user based on parent and child type

    **Returns**
    200 Success
    """
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

    def get_user_type(self, user):
        child_user = ChildProfile.objects.filter(user_id=user.id)
        if len(child_user)>0:
            return "Child"
        else:
            User.objects.get(id=user.id)
            return "Parent"

    def validate_relation(self, logged_user, switch_user):
        logged_user_type = self.get_user_type(logged_user)
        switch_user_type = self.get_user_type(switch_user)

        if logged_user_type == "Parent" and switch_user_type == "Child":
            switch_child_user = ChildProfile.objects.get(user_id=switch_user.id)
            if switch_child_user.parent_id == logged_user.id:
                return True

        elif logged_user_type == "Child" and switch_user_type == "Parent":
            logged_child_user = ChildProfile.objects.get(user_id=logged_user.id)
            if logged_child_user.parent_id == switch_user.id:
                return True

        elif logged_user_type == "Child" and switch_user_type == "Child":
            logged_child_user = ChildProfile.objects.get(user_id=logged_user.id)
            switch_child_user = ChildProfile.objects.get(user_id=switch_user.id)
            if logged_child_user.parent_id == switch_child_user.parent_id:
                return True
        return False

    @method_decorator(csrf_protect)
    def post(self, request):
        try:
            response = {}
            switch_to_email = request.data['email']
            switch_to_user = User.objects.get(email=switch_to_email)

            if self.validate_relation(request.user, switch_to_user):
                login(request, switch_to_user)
                response['status'] = "Success"
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserExitView(APIView):
    """
    Logout the user and remove the user cookies and session
    """

    def post(self, request):
        response = HttpResponse('Cookies Deleted')
        response.delete_cookie("sessionid", path="/")
        response.delete_cookie("XSRF-TOKEN", path="/")
        return response
