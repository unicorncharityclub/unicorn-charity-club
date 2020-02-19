from .views import get_account_details
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<int:user_id>', get_account_details),
    path('/update/<int:user_id>', get_account_details),
]
