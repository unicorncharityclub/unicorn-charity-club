from .views import get_account_details, update_account_details
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<str:user_emailid>', get_account_details),
    path('<str:user_emailid>/', update_account_details)

]
