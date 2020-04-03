from django.urls import path
from accounts.api import views

from .views import (
     login_user
)

urlpatterns = [
    #path('register', register_user_view),
    path('register', views.UserRegistrationView.as_view()),
    path('login', login_user),
]