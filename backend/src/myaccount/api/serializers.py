from rest_framework import serializers

from accounts.models import User
from ..models import Myaccount


class MyaccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Myaccount
        fields = ('Address', 'Mobile', 'ProfilePic')
