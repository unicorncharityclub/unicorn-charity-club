from django.db import DatabaseError
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.hashers import make_password, check_password
from profile.models import ChildProfile, Profile
from .serializers import AccountDetailsSerializer, AccountUpdateSerializer
from ..models import User
import json
from django.http import JsonResponse
from django.contrib.auth import login
import django.middleware.csrf
from django.http import Http404

@csrf_exempt
def register_user_view(request):
    response = {'status': "Invalid Request"}
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            first_name = json_data["first_name"]
            last_name = json_data["last_name"]
            email = json_data["email"]
            password = json_data["password"]
            dob = json_data["dob"]
            hashed_password = make_password(password)
            user = User.objects.create(first_name=first_name, last_name=last_name, email=email,
                                       password=hashed_password,
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
            # user_authenticated = authenticate(request, email = email, password = password)
            hashed_password = user.password
            if check_password(password, hashed_password) and user.is_active == True:
                user_details_list = []
                child_details_list = []
                login(request, user)
                name = user.first_name + user.last_name
                if user.profile.profile_pic:
                    profile_pic = request.build_absolute_uri(user.profile.profile_pic.url)
                else:
                    profile_pic = ""
                email = user.email
                user_details = {"name": name, "email": email, "photo": profile_pic}
                user_details_list.append(user_details)
                children = ChildProfile.objects.filter(parent_id=user.id)
                if children:
                    for child in children:
                        child_user_id = child.user_id
                        child_profile_object = Profile.objects.get(user_id=child_user_id)
                        child_account_object = User.objects.get(pk=child_user_id)
                        child_email_id = child_account_object.email
                        if child_profile_object.profile_pic:
                            child_photo = request.build_absolute_uri(child_profile_object.profile_pic.url)
                        else:
                            child_photo = ""
                        child_name = child_account_object.first_name + child_account_object.last_name
                        child_details = {"name": child_name, "email": child_email_id, "photo": child_photo}
                        user_details_list.append(child_details)
                response['status'] = "Success"
                response['user_list'] = user_details_list
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


class UserAccountMixin(object):
    def get(self, request, user_email):
        try:
            result = AccountDetailsSerializer(User.objects.get(email=user_email)).data
            user_id = result["id"]
            del result["id"]
            result.update(super().get(request, user_id))
            return result
        except User.DoesNotExist:
            raise Http404

    @method_decorator(csrf_protect)
    def put(self, request, user_email):
        try:
            user_model = User.objects.get(email=user_email)
            serializer = AccountUpdateSerializer(user_model, data=request.data)
            if serializer.is_valid():
                serializer.save()
                super().put(request, user_model.id)
        except User.DoesNotExist:
            raise Http404