import string
from django.utils.crypto import random
from accounts.api.serializers import AccountUpdateSerializer
from accounts.models import User
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import MyaccountSerializer, ChildAccountSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from ..models import Myaccount, ChildAccount

child_email_id_extension = "@ucc_child_user.com"


@api_view(['GET', 'PUT'])
@parser_classes([MultiPartParser, FormParser])
def account_details(request, user_emailid):
    response = {'status': "Success"}
    if request.method == 'GET':
        get_user_details(request, response, user_emailid)
    elif request.method == 'PUT':
        put_user_details(request, response, user_emailid)
    return JsonResponse(response)


'''
Child Account API Methods
'''


# Method is used to create a new child detail
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_child_details(request, user_emailid):
    response = {'status': "Success"}
    parent_user = User.objects.get(email=user_emailid)
    parent_user_id = parent_user.id

    # Step 1 - create the user in the 'Users' table
    child_user_email = parent_user.email.split("@")[0] + "_" + request.data[
        'first_name'] + "_" + random_string() + child_email_id_extension
    child_user = User.objects.create(first_name=request.data['first_name'], last_name=request.data['last_name'],
                                     email=child_user_email, password=random_string(20),
                                     dob=request.data['DOB'], gender=request.data['Gender'])
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
def get_child_list(request, user_emailid):
    response = {'status': "Success"}
    user = User.objects.get(email=user_emailid)
    childrens = ChildAccount.objects.filter(ParentId_id=user.id)
    child_list = []

    for child in childrens:
        child_id = child.user_id
        child_user_details = User.objects.get(pk=child_id)  # get child user table details to fetch the name
        account_details = Myaccount.objects.get(user_id=child_id)  # get child account info to get the profile pic

        child_details = {}
        child_details['Name'] = child_user_details.first_name + " " + child_user_details.last_name
        if account_details.ProfilePic:
            child_details['Photo'] = request.build_absolute_uri(account_details.ProfilePic.url)
        else:
            child_details['Photo'] = ''
        child_details['EmailId'] = child_user_details.email
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


def put_user_details(request, response, user_email_id):
    try:
        print(request.data)
        user = User.objects.get(email=user_email_id)  # get details of user by emailid
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


def get_user_details(request, response, user_email_id):
    try:
        user_details = User.objects.get(email=user_email_id)  # get child user table details
        if user_details:
            user_id = user_details.id
            account_details_object = Myaccount.objects.get(user_id=user_id)  # get child account info

            response['email'] = user_details.email
            response['first_name'] = user_details.first_name
            response['last_name'] = user_details.last_name
            response['dob'] = user_details.dob
            response['gender'] = user_details.gender
            response['address'] = account_details_object.Address
            response['mobile'] = account_details_object.Mobile
            response['aboutme'] = account_details_object.Aboutme
            response['favorite_thing'] = account_details_object.FavoriteThing
            response['dream'] = account_details_object.Dream
            response['super_powers'] = account_details_object.SuperPowers
            response['support'] = account_details_object.Support

            if get_user_type(user_email_id) == "Child":
                child_details_object = ChildAccount.objects.get(user_id=user_id)
                response['school'] = child_details_object.School
                response['school_grade'] = child_details_object.SchoolGrade

            if account_details_object.ProfilePic:
                response['profile_pic'] = request.build_absolute_uri(account_details_object.ProfilePic.url)
            else:
                response['profile_pic'] = ''
        else:
            response['status'] = "Invalid Request"
    except ValueError:
        response['status'] = "Invalid Request"
    except:
        response['status'] = "Issue In Request"


def update_user_profile_details(request, user_id):
    profile_details = {}
    add_if_exist_in_request(request, profile_details, 'Address')
    add_if_exist_in_request(request, profile_details, 'Mobile')
    add_if_exist_in_request(request, profile_details, 'Aboutme')
    add_if_exist_in_request(request, profile_details, 'FavoriteThing')
    add_if_exist_in_request(request, profile_details, 'Dream')
    add_if_exist_in_request(request, profile_details, 'SuperPowers')
    add_if_exist_in_request(request, profile_details, 'Support')
    add_if_exist_in_request(request, profile_details, 'ProfilePic')

    child_account_object = Myaccount.objects.get(user=user_id)
    child_account_serializer = MyaccountSerializer(child_account_object, data=profile_details)
    if child_account_serializer.is_valid():
        child_account_serializer.save()
        return True
    else:
        return False


def set_only_child_details(request, child_user_id, parent_user_id):
    child_details = {}
    child_details['user'] = child_user_id
    child_details['ParentId'] = parent_user_id
    child_details['School'] = request.data['School']
    child_details['SchoolGrade'] = request.data['SchoolGrade']

    child_details_serializer = ChildAccountSerializer(data=child_details)
    if child_details_serializer.is_valid():
        child_details_serializer.save()
        return True
    else:
        return False


def update_only_child_details(request, child_user_id):
    child_details_object = ChildAccount.objects.get(user_id=child_user_id)
    if child_details_object:
        child_details = {}
        add_if_exist_in_request(request, child_details, 'School')
        add_if_exist_in_request(request, child_details, 'SchoolGrade')

        child_details_serializer = ChildAccountSerializer(child_details_object, data=child_details)
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
        print(child_user_serializer.error_messages)
        return False
