from rest_framework import serializers
from ..models import ProjectUserDetails


class ProjectUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserDetails
        fields = ('pu_id', 'video')
