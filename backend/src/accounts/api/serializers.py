from rest_framework import serializers

from ..models import User


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'gender', 'dob', 'is_active', 'is_staff' )
