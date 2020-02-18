from rest_framework import viewsets
import json
from accounts.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class MyaccountViewSet(viewsets.ModelViewSet):

    @csrf_exempt
    def get_account_details(request, user_id):
        response = {'status': "Invalid Request"}
        user = User.objects.get(pk=user_id)
        json_data = json.loads(request.body)
        if request.method == 'GET':
            try:
                if user:
                    name = user.first_name + user.last_name
                    email = user.email
                    address = user.myaccount.Address
                    mobile = user.myaccount.Mobile
                    response['status'] = '"Success'
                    response["name"] = name
                    response['email'] = email
                    response['address'] = address
                    response['mobile'] = mobile
                else:
                    response['status'] = "Wrong user id"
            except ValueError:
                response['status'] = "Invalid Request"
        elif request.method == 'PUT':
            user.myaccount.Address = json_data['Address']
            user.myaccount.Mobile = json_data['Mobile']
            user.save()
        return JsonResponse(response)
