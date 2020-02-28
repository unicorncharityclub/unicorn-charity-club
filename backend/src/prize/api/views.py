from rest_framework import viewsets

from .serializers import PrizeSerializer
import os
from ..models import Prize
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response


def prizeList(request):
    response = {'status': "Success"}
    images = Prize.objects.all()
    image_list_final = []

    for image in images:
        image_list = {}
        image_list["prize_id"] = image.id
        image_list["prize_url"] = request.build_absolute_uri(image.Image.url)
        image_list_final.append(image_list)
    response["image_list"] = image_list_final
    return JsonResponse(response)
