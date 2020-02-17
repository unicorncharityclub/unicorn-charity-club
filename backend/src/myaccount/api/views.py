from rest_framework import viewsets
from ..models import Myaccount
from .serializers import MyaccountSerializer
from accounts.models import User
from django.http import JsonResponse


class MyaccountViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = MyaccountSerializer
    queryset = Myaccount.objects.all()


def get_account_details(request, user_id):
    response = {'status': "Invalid Request"}
    if request.method == 'GET':
        try:
            user = User.objects.get(pk=user_id)
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
    return JsonResponse(response)


