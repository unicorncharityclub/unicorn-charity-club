from rest_framework import serializers

from ..models import Myaccount


class MyaccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Myaccount
        fields = '__all__'
