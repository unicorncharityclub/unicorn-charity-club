from rest_framework import serializers
from prize.models import prize
class PrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = prize
        fields = ('Category',  'Tags', 'Name', 'Image')