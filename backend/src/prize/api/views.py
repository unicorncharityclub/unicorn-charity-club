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
    image_list = []

    for image in images:
        print(image)
        image_list.append(request.build_absolute_uri(image.Image.url))
    response["image_list"] = image_list
    return JsonResponse(response)
