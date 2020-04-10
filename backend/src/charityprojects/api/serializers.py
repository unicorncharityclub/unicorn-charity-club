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
    class Meta:
        model = VolunteerTime
        fields = '__all__'


class DevelopNewHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevelopNewHabit
        fields = ('new_habit', 'description', 'video', 'project_user')


class GiveDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiveDonation
        fields = '__all__'


class FundraiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fundraise
        fields = '__all__'


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
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())
    project = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=CharityProjects.objects.all())

    class Meta:
        model = ProjectUser
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        project_user = ProjectUser.objects.create(project=validated_data['project'],
                                                  user=validated_data['user'],
                                                  invited_by="", project_status="PlanningStarted")

        project_user.save()
        return project_user
