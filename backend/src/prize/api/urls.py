from .views import prizeList
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('prizeList', prizeList)

]