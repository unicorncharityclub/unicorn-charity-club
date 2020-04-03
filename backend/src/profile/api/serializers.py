from rest_framework import serializers

from accounts.models import User
from ..models import Profile, ChildProfile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('address', 'mobile', 'profile_pic', 'about_me', 'favorite_thing', 'dream', 'super_powers', 'support')


class ChildProfileSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())

    class Meta:
        model = ChildProfile
        fields = ('school', 'school_grade', 'parent', 'user')