from rest_framework import serializers
from ..models import Prize
class PrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prize
        fields = ('Category',  'Tags', 'Name', 'Image')