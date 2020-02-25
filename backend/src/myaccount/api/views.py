import json
from accounts.models import User
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import MyaccountSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from django.core.files.storage import FileSystemStorage

from ..models import Myaccount


def get_account_details(request, user_id):
    user = User.objects.get(pk=user_id)
    response = {'status': "Invalid Request"}
    if request.method == 'GET':
        try:
            if user:
                name = user.first_name + user.last_name
                email = user.email
                address = user.myaccount.Address
                mobile = user.myaccount.Mobile
                if user.myaccount.ProfilePic:
                    profilepic = user.myaccount.ProfilePic.url
                else:
                    profilepic = ""
                print(profilepic)
                response['status'] = '"Success'
                response["name"] = name
                response['email'] = email
                response['address'] = address
                response['mobile'] = mobile
                response['profilepic'] = request.build_absolute_uri(profilepic)
            else:
                response['status'] = "Wrong user id"
        except ValueError:
            response['status'] = "Invalid Request"
        # if request.method == 'PUT':
            # print("inside method")
            # print(request.FILES)
            #json_data = json.loads(request.body)
            #user.email = json_data['Email']
            #user.myaccount.Address = json_data['Address']
            #user.myaccount.Mobile = json_data['Mobile']
            #response['status'] = "Success"
            #user.save()
            #print(user)
    return JsonResponse(response)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_account_details(request, user_id):
    accountObject = Myaccount.objects.get(User=user_id)
    data_serializer = MyaccountSerializer(accountObject, data=request.data)
    if data_serializer.is_valid():
        data_serializer.save()
        return Response(data_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('error', data_serializer.errors)
        return Response(data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)