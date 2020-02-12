from rest_framework import serializers

from childAccount.models import ChildAccount


class ChildAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildAccount
        fields = ('id', 'Name', 'DOB', 'School', 'SchoolGrade', 'UnicornName', 'UnicornPowers', 'ImpactEmblem', 'Photo')

