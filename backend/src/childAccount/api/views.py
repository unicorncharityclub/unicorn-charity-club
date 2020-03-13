from childAccount.models import ChildAccount
from .serializers import ChildAccountSerializer, ChildUserAccountSerializer
from accounts.models import User
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
# from django.core.files.storage import FileSystemStorage


def get_account_details(request, user_emailid):
    response = {'status': "Success"}
    user = User.objects.get(email=user_emailid)
    childList = ChildAccount.objects.filter(UserId=user.id)
    chiilListview = []
    print(childList)
    for child in childList:
        lst = {}
        lst['Name'] = child.Name
        lst['DOB'] = child.DOB
        lst['Gender'] = child.Gender
        lst['School'] = child.School
        lst['SchoolGrade'] = child.SchoolGrade
        lst['Aboutme'] = child.Aboutme
        lst['FavoriteThing'] = child.FavoriteThing
        lst['Dream'] = child.Dream
        lst['SuperPowers'] = child.SuperPowers
        lst['Support'] = child.Support
        if child.Photo:
            lst['Photo'] = request.build_absolute_uri(child.Photo.url)
        else:
            lst['Photo'] = ''
        lst['id'] = child.id
        chiilListview.append(lst)
        response['lst'] = chiilListview
    return JsonResponse(response)


@api_view(['GET', 'PUT'])
@parser_classes([MultiPartParser, FormParser])
def get_child_details(request, pk):
    response = {'status': "Success"}
    if request.method == 'GET':
        child = ChildAccount.objects.get(id=pk)
        response['Name'] = child.Name
        response['DOB'] = child.DOB
        response['Gender'] = child.Gender
        response['School'] = child.School
        response['SchoolGrade'] = child.SchoolGrade
        response['Aboutme'] = child.Aboutme
        response['FavoriteThing'] = child.FavoriteThing
        response['Dream'] = child.Dream
        response['SuperPowers'] = child.SuperPowers
        response['Support'] = child.Support
        if child.Photo:
            response['Photo'] = request.build_absolute_uri(child.Photo.url)
        else:
            response['Photo'] = ''
        response['id'] = child.id
    elif request.method == 'PUT':
        childId = request.data['id']
        child = ChildAccount.objects.get(pk=childId)
        #request.data["User"] = child.UserId
        data_serializer = ChildAccountSerializer(child, data=request.data)
        if data_serializer.is_valid():
            data_serializer.save()
            return Response(data_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', data_serializer.errors)
            return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print(request.data)
    return JsonResponse(response)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_child_details(request, user_emailid):
    response = {'status': "Success"}
    user = User.objects.get(email=user_emailid)
    childUser ={}
    lst = {}
    lst['Name'] = request.data['Name']
    lst['DOB'] = request.data['DOB']
    lst['Gender'] = request.data['Gender']
    lst['School'] = request.data['School']
    lst['SchoolGrade'] = request.data['SchoolGrade']
    lst['Aboutme'] = request.data['Aboutme']
    lst['FavoriteThing'] = request.data['FavoriteThing']
    lst['Dream'] = request.data['Dream']
    lst['SuperPowers'] = request.data['SuperPowers']
    lst['Support'] = request.data['Support']
    lst['Photo'] = request.data['Photo']
    lst['UserId'] = user.id
    childUser['first_name'] = request.data['Name']
    childUser['first_name'] = ''
    childUser['dob'] = request.data['DOB']
    #childUser['gender'] = request['Gender']
    childUser['email'] = user_emailid
    child_serializer = ChildUserAccountSerializer(data=childUser)
    data_serializer = ChildAccountSerializer(data=lst)
    if data_serializer.is_valid():
        data_serializer.save()
        if child_serializer.is_valid():
            child_serializer.save()
        return Response(data_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('error', data_serializer.errors)
        return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    print(request.data)

    return JsonResponse(response)

