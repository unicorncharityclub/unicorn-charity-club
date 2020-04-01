from rest_framework import serializers
from ..models import ProjectUserDetails
from ..models import LearnNewSkill, DevelopNewHabit, GiveDonation
from ..models import VolunteerTime


class ProjectUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserDetails
        fields = ('project_user_id', 'video')


class LearnNewSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnNewSkill
        fields = ('project_user_id', 'new_skill', 'description', 'video')


class VolunteerTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerTime
        fields = '__all__'


class DevelopNewHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevelopNewHabit
        fields = ('project_user_id', 'new_habit', 'description', 'video')


class GiveDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiveDonation
        fields = '__all__'
