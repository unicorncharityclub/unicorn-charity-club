from rest_framework import serializers
from misc.models import Page


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop("id")
        data.pop("slug")
        return data
