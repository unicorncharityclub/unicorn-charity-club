import string
import random

from django.contrib.auth.hashers import make_password
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from accounts.api.views import UserAccountEmailMixin, UserAccountIdMixin
from accounts.models import User
from .serializers import ProfileSerializer, ChildProfileSerializer
from ..models import Profile, ChildProfile
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response

child_email_id_extension = "@ucc_child_user.com"


def random_string(string_length=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


def add_if_exist_in_request(request, data_dict, key):
    if key in request.data:
        data_dict[key] = request.data[key]
    pass


# Methods on the child model
class ChildProfileMixin(object):
    def get(self, request, user_id):
        try:
            data = ChildProfileSerializer(ChildProfile.objects.get(user_id=user_id)).data
            result = {}
            result.update({"school": data["school"], "school_grade": data["school_grade"]})
            result.update(super().get(request, user_id))
            return result
        except ChildProfile.DoesNotExist:
            result = {}
            result.update(super().get(request, user_id))
            return result

    @method_decorator(csrf_protect)
    def put(self, request, user_id):
        try:
            serializer = ChildProfileSerializer(ChildProfile.objects.get(user_id=user_id), data=request.data)
            if serializer.is_valid():
                serializer.save()
        except ChildProfile.DoesNotExist:
            pass
        super().put(request, user_id)

    def post(self, request, child_user_id, parent_user_id):
        try:
            data = {"user": child_user_id, "parent": parent_user_id,
                    "school": request.data["school"], "school_grade": request.data["school_grade"]}
            serializer = ChildProfileSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                raise Http404
        except Exception:
            raise Http404


# Methods on the profile model
class ParentProfileMixin(object):
    def get(self, request, user_id):
        try:
            result = ProfileSerializer(Profile.objects.get(user_id=user_id)).data
            if result["profile_pic"] is not None:
                result["profile_pic"] = request.build_absolute_uri(result["profile_pic"])
            else:
                result["profile_pic"] = ""
            return result
        except Profile.DoesNotExist:
            raise Http404

    @method_decorator(csrf_protect)
    def put(self, request, user_id):
        try:
            serializer = ProfileSerializer(Profile.objects.get(user=user_id), data=request.data)
            if serializer.is_valid():
                serializer.save()
        except Profile.DoesNotExist:
            raise Http404


class ProfileMixin(ChildProfileMixin, ParentProfileMixin, object):
    def get(self, request, user_id):
        result = {}
        result.update(super().get(request, user_id))
        return result

    @method_decorator(csrf_protect)
    def put(self, request, user_id):
        super().put(request, user_id)


class ChildrenListMixin(UserAccountIdMixin, ParentProfileMixin, object):
    def get(self, request, user_id):
        children = ChildProfile.objects.filter(parent_id=user_id)
        child_list = []
        for child in children:
            data = super().get(request, child.user_id)
            child_list.append(data)
        result = {'child_list': child_list}
        return result


class ProfileDetailView(UserAccountEmailMixin, ProfileMixin, APIView):
    def get(self, request, user_email):
        return Response(super().get(request, user_email))

    @method_decorator(csrf_protect)
    def put(self, request, user_email):
        super().put(request, user_email)
        return Response({'status': 'Success'})


class ChildrenListView(ChildrenListMixin, APIView):
    def get(self, request, user_email):
        try:
            user_id = User.objects.get(email=user_email).id
            result = super().get(request, user_id)
        except User.DoesNotExist:
            raise Http404
        return Response(result)


class AddChildView(APIView):
    def post(self, request, user_email):
        try:
            parent_user = User.objects.get(email=user_email)
            parent_user_id = parent_user.id
            child_user_email = parent_user.email.split("@")[0] + "_" + request.data[
                'first_name'] + "_" + random_string() + child_email_id_extension

            first_name = request.data["first_name"]
            last_name = request.data["last_name"]
            email = child_user_email
            dob = request.data["dob"]
            hashed_password = make_password(random_string(20))
            user = User.objects.create(first_name=first_name, last_name=last_name, email=email,
                                       password=hashed_password,
                                       dob=dob)
            user.save()

            # If the child is created in the DB
            child_user_id = User.objects.get(email=child_user_email).id
            ChildProfileMixin().post(request, child_user_id, parent_user_id)
            ProfileMixin().put(request, child_user_id)

        except User.DoesNotExist:
            raise Http404
        except ValueError:
            raise Http404
        except:
            raise Http404

        return Response({'status': 'Success'})
