import string
import random

from django.contrib.auth.hashers import check_password
import django.middleware.csrf
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from profile.api.serializers import ProfileSerializer, ChildProfileSerializer
from profile.api.views import ChildrenListMixin
from profile.models import Profile
from accounts.models import User
from accounts.api.serializers import AccountDetailsSerializer

child_email_id_extension = "@ucc.child.user.com"


def random_string(string_length=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


class UserRegisterMixin(object):
    def post(self, data, *args, **kwargs):
        response_data = {"status": "Success"}
        serializer = AccountDetailsSerializer(data=data, context={'password': data['password']})
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
    def post(self, request, *args, **kwargs):
        return super().post(request.data)


class UserLoginView(ChildrenListMixin, APIView):
    def post(self, request, *args, **kwargs):
        try:
            response = {'status': "Invalid Request"}
            user_details_list = []
            user = User.objects.get(email=request.data["email"], is_active=True)
            if check_password(request.data["password"], user.password):
                profile_serializer = ProfileSerializer(Profile.objects.get(id=user.id), context={'request': request})
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
            response['token'] = django.middleware.csrf.get_token(request)
            return Response(response, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AddChildView(UserRegisterMixin, APIView):
    def post(self, request, *args, **kwargs):
        try:
            if 'user_email' in kwargs:
                user_email = kwargs.get('user_email', None)
                parent_user = User.objects.get(email=user_email)
                parent_user_id = parent_user.id
                child_user_email = parent_user.email.split("@")[0] + "." + request.data[
                    'first_name'] + "." + random_string() + child_email_id_extension
                hashed_password = random_string(20)

                child_data = {'first_name': request.POST['first_name'], 'last_name': request.POST['last_name'],
                              'dob': request.POST['dob'], 'email': child_user_email, 'password': hashed_password}
                super().post(child_data)

                child_user_id = User.objects.get(email=child_user_email).id
                # Updating user profile details
                profile = Profile.objects.get(id=child_user_id)
                profile_serializer = ProfileSerializer(profile, data=request.data)
                if profile_serializer.is_valid():
                    profile_serializer.save()
                else:
                    print(profile_serializer.errors)

                # Creating child profile
                data = {"user": child_user_id, "parent": parent_user_id,
                        "school": request.data["school"], "school_grade": request.data["school_grade"]}
                serializer = ChildProfileSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except (User.DoesNotExist, Exception):
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Success'})
