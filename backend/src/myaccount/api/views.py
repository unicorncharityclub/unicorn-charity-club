import string

from django.utils.crypto import random

from accounts.api.serializers import AccountUpdateSerializer
from accounts.models import User
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import MyaccountSerializer, ChildAccountSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from ..models import Myaccount, ChildAccount


def get_account_details(request, user_emailid):
    user = User.objects.get(email=user_emailid)
    response = {'status': "Invalid Request"}
    if request.method == 'GET':
        try:
            if user:
                if user.myaccount.ProfilePic:
                    profilepic = request.build_absolute_uri(user.myaccount.ProfilePic.url)
                else:
                    profilepic = ""

                response['status'] = '"Success'
                response["name"] = user.first_name + " " + user.last_name
                response['email'] = user.email
                response['address'] = user.myaccount.Address
                response['mobile'] = user.myaccount.Mobile
                response['profilepic'] = profilepic
                response['aboutme'] = user.myaccount.Aboutme
                response['favorite_thing'] = user.myaccount.FavoriteThing
                response['dream'] = user.myaccount.Dream
                response['super_powers'] = user.myaccount.SuperPowers
                response['support'] = user.myaccount.Support
            else:
                response['status'] = "Wrong user id"
        except ValueError:
            response['status'] = "Invalid Request"
    return JsonResponse(response)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_account_details(request, user_emailid):
    user = User.objects.get(email=user_emailid)  # get details of user by emailid
    accountObject = Myaccount.objects.get(user=user.id)  # get account details object using 'user.id'
    #request.data["User"] = user.id  # add the 'User' (FK id) by manually setting the "User" key with the user.id value

    # initialise the serializer with the account object
    data_serializer = MyaccountSerializer(accountObject, data=request.data)
    if data_serializer.is_valid():
        data_serializer.save()
        return Response(data_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('error', data_serializer.errors)
        return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
Child Account API Methods
'''


def random_string(string_length=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


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


# Method is used to get the information of a particular user
@api_view(['GET', 'PUT'])
@parser_classes([MultiPartParser, FormParser])
def get_child_details(request, child_emailid):
    response = {'status': "Success"}
    child_user_details = User.objects.get(email=child_emailid)  # get child user table details
    child_user_id = child_user_details.id
    account_details_object = Myaccount.objects.get(user_id=child_user_id)  # get child account info
    child_details_object = ChildAccount.objects.get(user_id=child_user_id)

    if request.method == 'GET':
        response['Name'] = child_user_details.get_full_name()
        response['DOB'] = child_user_details.dob
        response['Gender'] = child_user_details.gender
        response['School'] = child_details_object.School
        response['SchoolGrade'] = child_details_object.SchoolGrade
        response['Aboutme'] = account_details_object.Aboutme
        response['FavoriteThing'] = account_details_object.FavoriteThing
        response['Dream'] = account_details_object.Dream
        response['SuperPowers'] = account_details_object.SuperPowers
        response['Support'] = account_details_object.Support
        if account_details_object.ProfilePic:
            response['Photo'] = request.build_absolute_uri(account_details_object.ProfilePic.url)
        else:
            response['Photo'] = ''
        response['EmailId'] = child_user_details.email
    elif request.method == 'PUT':
        if(update_child_user_details(request, child_user_id) and
            update_child_account_details(request, child_user_id) and
                update_only_child_details(request, child_details_object)):
            response['status'] = "Success"
        else:
            response['status'] = "Issue In Updating Child Details"

    return JsonResponse(response)


# Method is used to create a new child detail
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_child_details(request, user_emailid):
    response = {'status': "Success"}
    parent_user = User.objects.get(email=user_emailid)
    parent_user_id = parent_user.id

    # Step 1 - create the user in the 'Users' table
    child_user_email = parent_user.email.split("@")[0] + "_" + request.data['first_name'] + "_" + random_string() + "@ucc_child_user.com"
    child_user = User.objects.create(first_name=request.data['first_name'], last_name=request.data['last_name'], email=child_user_email, password=random_string(20),
                               dob=request.data['DOB'], gender=request.data['Gender'])
    child_user.save()
    child_user_id = child_user.id

    # Step 2 - Enter details in the accounts table
    if update_child_account_details(request, child_user_id):
        # Step 3 - Enter child details in the child table
        if set_only_child_details(request, child_user_id, parent_user_id):
            response['status'] = "Success"
        else:
            response['status'] = "Issue In Creating Child Details"
    else:
        response['status'] = "Issue In Updating Child Account Details"

    return JsonResponse(response)


def update_child_account_details(request, child_user_id):
    child_account_details = {}
    child_account_details['Address'] = request.data['Address']
    child_account_details['Mobile'] = request.data['Mobile']
    child_account_details['Aboutme'] = request.data['Aboutme']
    child_account_details['FavoriteThing'] = request.data['FavoriteThing']
    child_account_details['Dream'] = request.data['Dream']
    child_account_details['SuperPowers'] = request.data['SuperPowers']
    child_account_details['Support'] = request.data['Support']
    if "Photo" in request.data:
        child_account_details['Photo'] = request.data['Photo']

    child_account_object = Myaccount.objects.get(user=child_user_id)
    child_account_serializer = MyaccountSerializer(child_account_object, data=child_account_details)
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


def update_only_child_details(request, child_details_object):
    child_details = {}
    child_details['School'] = request.data['School']
    child_details['SchoolGrade'] = request.data['SchoolGrade']

    child_details_serializer = ChildAccountSerializer(child_details_object, data=child_details)
    if child_details_serializer.is_valid():
        child_details_serializer.save()
        return True
    else:
        return False


def update_child_user_details(request, child_user_id):
    child_user_details = {}
    child_user_details['first_name'] = request.data['first_name']
    child_user_details['last_name'] = request.data['last_name']
    child_user_details['dob'] = request.data['DOB']
    child_user_details['gender'] = request.data['Gender']
    child_user_object = User.objects.get(pk=child_user_id)
    print(child_user_object)

    child_user_serializer = AccountUpdateSerializer(child_user_object, data=child_user_details)
    if child_user_serializer.is_valid():
        child_user_serializer.save()
        return True
    else:
        print(child_user_serializer.error_messages)
        return False
