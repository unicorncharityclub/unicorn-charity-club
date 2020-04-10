from rest_framework import serializers
from ..models import ProjectUserDetails
from ..models import LearnNewSkill, DevelopNewHabit, GiveDonation, Fundraise
from ..models import VolunteerTime


class ProjectUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserDetails
        fields = ('project_user_id', 'video')


class LearnNewSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnNewSkill
        fields = ('new_skill', 'description', 'video', 'project_user')


class VolunteerTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerTime
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'volunteer_hours', 'volunteer_work_description', 'volunteer_exp')


class DevelopNewHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevelopNewHabit
        fields = ('new_habit', 'description', 'video', 'project_user')


class GiveDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiveDonation
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'donation_details', 'donation_exp')


class FundraiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fundraise
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'fundraise_details', 'fundraise_amount', 'fundraise_exp')
