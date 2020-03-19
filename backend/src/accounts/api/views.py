from django.db import DatabaseError
from django.views.decorators.csrf import csrf_exempt
from ..models import User
from childAccount.models import ChildAccount
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
import django.middleware.csrf

@csrf_exempt
def register_user_view(request):
    response = {'status':"Invalid Request"}
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            first_name = json_data["first_name"]
            last_name = json_data["last_name"]
            email = json_data["email"]
            password = json_data["password"]
            dob = json_data["dob"]
            user = User.objects.create(first_name=first_name, last_name=last_name, email=email, password=password,
                                       dob=dob)
            user.save()
            response['status'] = "Success"
        except ValueError:
            response['status'] = "Invalid Request"
        except DatabaseError:
            response['status'] = "User Already Exists"
    return JsonResponse(response)

@csrf_exempt
def login_user(request):
    response = {'status': "Invalid Request"}
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            email = json_data["email"]
            password = json_data["password"]
            user = User.objects.get(email=email)
            #user_authenticated = authenticate(request, email = email, password = password)
            if user.password == password and user.is_active == True:
                user_details_list = []
                child_details_list = []
                login(request, user)
                name = user.first_name + user.last_name
                if user.myaccount.ProfilePic:
                    profilepic = request.build_absolute_uri(user.myaccount.ProfilePic.url)
                else:
                    profilepic = ""
                email = user.email
                user_details = {"name": name, "email": email, "photo": profilepic}
                user_details_list.append(user_details)
                children = ChildAccount.objects.filter(UserId_id=user.id)
                if children:
                    for child in children:
                        child_email_id = email
                        if child.Photo:
                            child_photo = request.build_absolute_uri(child.Photo.url)
                        else:
                            child_photo = ""
                        child_details = {"name": child.Name, "email": child_email_id, "photo": child_photo}
                        child_details_list.append(child_details)
                user_list = {"user_details": user_details_list, "child_details": child_details_list}
                response['status'] = "Success"
                response['user_list'] = user_list
                response['token'] = django.middleware.csrf.get_token(request)
            else:
                response['status'] = "Wrong Username or Password"
        except ValueError:
            response['status'] = "Invalid Request"
        except DatabaseError:
            response['status'] = "User Not Registered"
        except User.DoesNotExist:
            response['status'] = "User Not Registered"
    return JsonResponse(response)





            




