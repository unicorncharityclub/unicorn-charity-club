from rest_framework import serializers

from accounts.models import User
from ..models import Myaccount


class MyaccountSerializer(serializers.ModelSerializer):
    User = serializers.PrimaryKeyRelatedField(read_only=False, queryset=User.objects.all())

    class Meta:
        model = Myaccount
        fields = ('Address', 'Mobile', 'ProfilePic', 'User')
