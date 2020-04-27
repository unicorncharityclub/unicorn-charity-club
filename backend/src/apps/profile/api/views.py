from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.accounts.api.serializers import AccountDetailsSerializer
from apps.accounts import User
from profile.api.serializers import ProfileSerializer, ChildProfileSerializer
from profile.models import Profile, ChildProfile


class ChildrenListMixin(object):
    request = None

    def get(self, request, *args, **kwargs):
        """
        For a given parent return the list of children.
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        try:
            child_list = []
            if 'user_email' in kwargs:
                parent_email = kwargs.get('user_email', None)
                parent_id = User.objects.get(email=parent_email).id
                children = ChildProfile.objects.filter(parent_id=parent_id)
                for child in children:
                    profile = Profile.objects.get(user_id=child.user_id)
                    profile_serializer = ProfileSerializer(profile, context={'request': self.request})
                    child_data = AccountDetailsSerializer(User.objects.get(id=child.user_id)).data
                    child_data.update(profile_serializer.data)
                    child_list.append(child_data)
            return Response({"child_list": child_list})
        except (Profile.DoesNotExist, Profile.DoesNotExist, ChildProfile.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)


class ProfileDetailView(APIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_protect)
    def get(self, request):
        """
        Get details of user's profile
        :param request:
        :return: user profile
        """
        result = {}
        try:
            # Getting user account details
            user = request.user
            user_id = user.id
            user_serializer = AccountDetailsSerializer(user)
            result.update(user_serializer.data)

            # Getting user profile along with child details
            profile = Profile.objects.get(id=user_id)
            profile_serializer = ProfileSerializer(profile, context={'request': request})
            result.update(profile_serializer.data)

            return Response(result, status=status.HTTP_200_OK)
        except (Profile.DoesNotExist, Profile.DoesNotExist, ChildProfile.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)

    @method_decorator(csrf_protect)
    def put(self, request):
        """
        Update user's profile based on user type
        :param request:
        """
        try:
            # Updating user account details
            user = request.user
            user_id = user.id
            user_serializer = AccountDetailsSerializer(user, data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()

            # Updating user profile details
            profile = Profile.objects.get(id=user_id)
            profile_serializer = ProfileSerializer(profile, data=request.data)
            if profile_serializer.is_valid():
                profile_serializer.save()

            # Updating child profile details
            child_profile = ChildProfile.objects.filter(user_id=user_id)
            if child_profile:
                child_profile = child_profile[0]
                child_profile_serializer = ChildProfileSerializer(child_profile, data=request.data)
                if child_profile_serializer.is_valid():
                    child_profile_serializer.save()
            return Response({'status': 'Success'}, status=status.HTTP_200_OK)
        except (Profile.DoesNotExist, Profile.DoesNotExist, ChildProfile.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)


class ChildrenListView(ChildrenListMixin, APIView):
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
