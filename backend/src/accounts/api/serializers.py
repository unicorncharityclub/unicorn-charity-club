from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from accounts.models import User


class AccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'password', 'last_name', 'email', 'gender', 'dob', 'is_active', 'is_staff')
        read_only_fields = ['password', 'is_active', 'is_staff']

    def create(self, validated_data):
        password = self.context.get('password', None)
        if password is None:
            return None
        user = User.objects.create(first_name=validated_data['first_name'],
                                   last_name=validated_data['last_name'],
                                   email=validated_data['email'],
                                   password=password,
                                   dob=validated_data['dob'])
        user.save()
        return user

    def to_representation(self, obj):
        result = super(AccountDetailsSerializer, self).to_representation(obj)
        result.update({"full_name": result["first_name"] + " " + result["last_name"]})
        return result

    @property
    def data(self):
        result = super().data
        result.pop('password')
        result.pop('id')
        result.pop('is_active')
        result.pop('is_staff')
        return result
