from .views import get_account_details, get_child_details, add_child_details
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<str:user_emailid>', get_account_details),
    path('child/<int:pk>/', get_child_details),
    path('addchild/<str:user_emailid>/', add_child_details)
]
