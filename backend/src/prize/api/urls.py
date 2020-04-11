from .views import prize_list
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('prizeList', prize_list)
]