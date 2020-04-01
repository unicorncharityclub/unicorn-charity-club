import string
import random
from accounts.api.serializers import AccountUpdateSerializer
from accounts.api.views import UserDetailsMixin
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


@api_view(['GET', 'PUT'])
@parser_classes([MultiPartParser, FormParser])
def account_details(request, user_email):
    response = {'status': "Success"}
    if request.method == 'GET':
        get_user_details(request, response, user_email)
    elif request.method == 'PUT':
        put_user_details(request, response, user_email)
    return JsonResponse(response)


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


# Method is used to get the list of children's
def get_child_list(request, user_email):
    response = {'status': "Success"}
    user = User.objects.get(email=user_email)
    childrens = ChildProfile.objects.filter(parent_id=user.id)
    child_list = []

    for child in childrens:
        child_id = child.user_id
        child_user_details = User.objects.get(pk=child_id)  # get child user table details to fetch the name
        profile_details = Profile.objects.get(user_id=child_id)  # get child account info to get the profile pic

        child_details = {}
        child_details['name'] = child_user_details.first_name + " " + child_user_details.last_name
        if profile_details.profile_pic:
            child_details['photo'] = request.build_absolute_uri(profile_details.profile_pic.url)
        else:
            child_details['photo'] = ''
        child_details['email'] = child_user_details.email
        child_list.append(child_details)
        response['child_list'] = child_list
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


def put_user_details(request, response, user_email):
    try:
        user = User.objects.get(email=user_email)  # get details of user by emailid
        user_id = user.id
        if (update_user_account_details(request, user_id) and
                update_user_profile_details(request, user_id) and
                update_only_child_details(request, user_id)):
            response['status'] = "Success"
        else:
            response['status'] = "Issue In Updating Child Details"
    except ValueError:
        response['status'] = "Invalid Request"
    except:
        response['status'] = "Issue In Request"


def get_user_details(request, response, user_email):
    pass


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


def update_only_child_details(request, child_user_id):
    child_details_object = ChildProfile.objects.get(user_id=child_user_id)
    if child_details_object:
        child_details = {}
        add_if_exist_in_request(request, child_details, 'school')
        add_if_exist_in_request(request, child_details, 'school_grade')

        child_details_serializer = ChildProfileSerializer(child_details_object, data=child_details)
        if child_details_serializer.is_valid():
            child_details_serializer.save()
            return True
        else:
            return False
    else:
        return True


def update_user_account_details(request, user_id):
    user_details = {}
    add_if_exist_in_request(request, user_details, 'first_name')
    add_if_exist_in_request(request, user_details, 'last_name')
    add_if_exist_in_request(request, user_details, 'dob')
    add_if_exist_in_request(request, user_details, 'gender')
    child_user_object = User.objects.get(pk=user_id)
    child_user_serializer = AccountUpdateSerializer(child_user_object, data=user_details)
    if child_user_serializer.is_valid():
        child_user_serializer.save()
        return True
    else:
        return False


class UserChildProfileMixin(object):
    def get(self, request, user_id):
        try:
            data = ChildProfileSerializer(ChildProfile.objects.get(user_id=user_id)).data
            result = {}
            result.update({"school": data["school"], "school_grade": data["school_grade"]})
            return result
        except ChildProfile.DoesNotExist:
            return ""


class UserProfileMixin(UserChildProfileMixin, object):
    def get(self, request, user_id):
        try:
            result = ProfileSerializer(Profile.objects.get(user_id=user_id)).data
            result.update(super().get(request, user_id))
            if result["profile_pic"] is not None:
                result["profile_pic"] = request.build_absolute_uri(result["profile_pic"])
            else:
                result["profile_pic"] = ""
            return result
        except Profile.DoesNotExist:
            raise Http404


class ProfileDetail(UserDetailsMixin, UserProfileMixin, APIView):
    def get(self, request, user_email):
        result = {}
        result.update(super().get(request, user_email))
        return Response(result)
