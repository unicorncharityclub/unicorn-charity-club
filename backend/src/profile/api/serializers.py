from rest_framework import serializers
from accounts.models import User
from profile.models import Profile, ChildProfile


def get_child_profile(user):
    result = {}
    child_profile = ChildProfile.objects.filter(user_id=user)
    if child_profile:
        child_profile = child_profile[0]
        child_profile_serializer = ChildProfileSerializer(child_profile)
        result.update(child_profile_serializer.data)
    return result


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('address', 'mobile', 'profile_pic', 'about_me', 'favorite_thing', 'dream', 'super_powers',
                  'support', 'user')
        read_only_fields = ['user']

    def to_representation(self, obj):
        result = super(ProfileSerializer, self).to_representation(obj)
        request = self.context.get('request')
        if request:
            profile_pic = result.pop('profile_pic')
            if profile_pic:
                profile_pic = request.build_absolute_uri(profile_pic)
                result.update({"profile_pic": profile_pic})
            else:
                result.update({"profile_pic": ""})
            result.update(get_child_profile(result.pop('user')))
        return result


class ChildProfileSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())

    class Meta:
        model = ChildProfile
        fields = ('school', 'school_grade', 'parent', 'user')

    def to_representation(self, obj):
        result = super(ChildProfileSerializer, self).to_representation(obj)
        result.pop('parent')
        result.pop('user')
        return result
