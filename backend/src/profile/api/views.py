import string
import random
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from accounts.api.views import UserAccountEmailMixin, UserAccountIdMixin
from accounts.models import User
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ProfileSerializer, ChildProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from ..models import Profile, ChildProfile
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response

child_email_id_extension = "@ucc_child_user.com"

'''
Child Account API Methods
'''

# Method is used to create a new child detail
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_child_details(request, user_email):
    response = {'status': "Success"}
    parent_user = User.objects.get(email=user_email)
    parent_user_id = parent_user.id

    # Step 1 - create the user in the 'Users' table
    child_user_email = parent_user.email.split("@")[0] + "_" + request.data[
        'first_name'] + "_" + random_string() + child_email_id_extension

    child_user = User.objects.create(first_name=request.data['first_name'],
                                     last_name=request.data['last_name'] if 'last_name' in request.data else "",
                                     email=child_user_email,
                                     password=random_string(20),
                                     dob=request.data['dob'] if 'dob' in request.data else "",
                                     gender=request.data['gender'] if 'gender' in request.data else "")
    child_user.save()
    child_user_id = child_user.id

    # Step 2 - Enter details in the accounts table
    if update_user_profile_details(request, child_user_id):
        # Step 3 - Enter child details in the child table
        if set_only_child_details(request, child_user_id, parent_user_id):
            response['status'] = "Success"
        else:
            response['status'] = "Issue In Creating Child Details"
    else:
        response['status'] = "Issue In Updating Child Account Details"

    return JsonResponse(response)


'''
Common Functions
'''


def random_string(string_length=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


def add_if_exist_in_request(request, data_dict, key):
    if key in request.data:
        data_dict[key] = request.data[key]
    pass


def get_user_type(user_email_id):
    if user_email_id.endswith(child_email_id_extension):
        return "Child"
    else:
        return "Parent"


def update_user_profile_details(request, user_id):
    profile_details = {}
    add_if_exist_in_request(request, profile_details, 'address')
    add_if_exist_in_request(request, profile_details, 'mobile')
    add_if_exist_in_request(request, profile_details, 'about_me')
    add_if_exist_in_request(request, profile_details, 'favorite_thing')
    add_if_exist_in_request(request, profile_details, 'dream')
    add_if_exist_in_request(request, profile_details, 'super_powers')
    add_if_exist_in_request(request, profile_details, 'support')
    add_if_exist_in_request(request, profile_details, 'profile_pic')

    child_account_object = Profile.objects.get(user=user_id)
    child_account_serializer = ProfileSerializer(child_account_object, data=profile_details)
    if child_account_serializer.is_valid():
        child_account_serializer.save()
        return True
    else:
        return False


def set_only_child_details(request, child_user_id, parent_user_id):
    child_details = {}
    child_details['user_id'] = child_user_id
    child_details['parent_id'] = parent_user_id
    child_details['school'] = request.data['school']
    child_details['school_grade'] = request.data['school_grade']
    child_details_serializer = ChildProfileSerializer(data=child_details)
    if child_details_serializer.is_valid():
        child_details_serializer.save()
        return True
    else:
        return False


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
            return ""

    def put(self, request, user_id):
        try:
            serializer = ChildProfileSerializer(ChildProfile.objects.get(user_id=user_id), data=request.data)
            if serializer.is_valid():
                serializer.save()
        except ChildProfile.DoesNotExist:
            return


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
                super().post(request, user_id)
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
            print(child.user_id)
            data = super().get(request, child.user_id)
            child_list.append(data)
        result = {'child_list': child_list}
        return result


class ProfileDetailView(UserAccountEmailMixin, ProfileMixin, APIView):
    def get(self, request, user_email):
        result = {}
        result.update(super().get(request, user_email))
        return Response(result)

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