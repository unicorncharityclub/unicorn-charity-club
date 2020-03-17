from rest_framework import serializers

from childAccount.models import ChildAccount
from accounts.models import User


class ChildAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildAccount
        fields = ('id', 'Name', 'DOB', 'Gender', 'School', 'SchoolGrade', 'Aboutme',
                  'FavoriteThing', 'Dream', 'SuperPowers', 'Support', 'Photo', 'UserId')


class ChildUserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'dob', 'gender', 'email')

