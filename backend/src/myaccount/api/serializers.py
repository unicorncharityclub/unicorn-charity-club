from rest_framework import serializers
from ..models import Myaccount, ChildAccount


class MyaccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Myaccount
        fields = ('Address', 'Mobile', 'ProfilePic', 'Aboutme', 'FavoriteThing', 'Dream', 'SuperPowers', 'Support')


class ChildAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildAccount
        fields = ('id', 'School', 'SchoolGrade', 'ParentId', 'user')