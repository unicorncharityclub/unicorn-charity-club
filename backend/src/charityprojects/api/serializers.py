from rest_framework import serializers
from ..models import ProjectUserDetails
from ..models import LearnNewSkill
from ..models import VolunteerTime

class ProjectUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserDetails
        fields = ('pu_id', 'video')


class LearnNewSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnNewSkill
        fields = ('pu_id', 'newSkill', 'description', 'video')


class VolunteerTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerTime
        fields = '__all__'
