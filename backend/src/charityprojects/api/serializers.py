from rest_framework import serializers

from accounts.models import User
from charityprojects.models import CharityProjects, VolunteerTime, ProjectUserDetails, LearnNewSkill, \
    DevelopNewHabit, GiveDonation, Fundraise, ProjectUser


class ProjectUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserDetails
        fields = ('project_user_id', 'video')


class LearnNewSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnNewSkill
        fields = ('new_skill', 'description', 'video', 'project_user')


class VolunteerTimeSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = VolunteerTime
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'volunteer_hours', 'volunteer_work_description', 'exp_video')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('exp_video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"exp_video": video})
            else:
                result.update({"exp_video": ""})
        return result


class DevelopNewHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevelopNewHabit
        fields = ('new_habit', 'description', 'video', 'project_user')


class GiveDonationSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = GiveDonation
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'donation_details', 'exp_video')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('exp_video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"exp_video": video})
            else:
                result.update({"exp_video": ""})
        return result


class FundraiserSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Fundraise
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'fundraise_details', 'fundraise_amount', 'exp_video')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('exp_video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"exp_video": video})
            else:
                result.update({"exp_video": ""})
        return result


class CharityProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharityProjects
        fields = '__all__'
        read_only_fields = ['id']

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('video')
            badge = result.pop('badge')
            banner = result.pop('banner')

            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"video": video})
            else:
                result.update({"video": ""})

            if badge:
                badge = request_here.build_absolute_uri(badge)
                result.update({"badge": badge})
            else:
                result.update({"badge": ""})

            if banner:
                banner = request_here.build_absolute_uri(banner)
                result.update({"banner": banner})
            else:
                result.update({"banner": ""})
        return result


class ProjectUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    project = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = ProjectUser
        fields = '__all__'
        read_only_fields = ['id']
