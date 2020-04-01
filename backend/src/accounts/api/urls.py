from django.urls import path
from accounts.api import views

from .views import (
     register_user_view, login_user
)

urlpatterns = [
    path('register', register_user_view),
    path('login', login_user),
]