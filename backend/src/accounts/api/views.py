from django.db import DatabaseError
from django.views.decorators.csrf import csrf_exempt
from ..models import User
import json
from django.http import JsonResponse


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


