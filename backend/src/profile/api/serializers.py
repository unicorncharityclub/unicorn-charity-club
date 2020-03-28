from rest_framework import serializers
from ..models import Profile, ChildProfile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('address', 'mobile', 'profile_pic', 'about_me', 'favorite_thing', 'dream', 'super_powers', 'support')


class ChildProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildProfile
        fields = ('id', 'school', 'school_grade', 'parent', 'user')