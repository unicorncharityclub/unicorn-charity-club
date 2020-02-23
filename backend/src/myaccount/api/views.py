import json
from accounts.models import User
from django.http import JsonResponse


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
    elif request.method == "PUT":
        response = {'status': "Invalid Request"}
        if request.method == 'PUT':
            print("inside method")
            json_data = json.loads(request.body)
            user.email = json_data['Email']
            user.myaccount.Address = json_data['Address']
            user.myaccount.Mobile = json_data['Mobile']
            response['status'] = "Success"
            user.save()
            print(user)
    return JsonResponse(response)
