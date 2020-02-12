from django.urls import path

from .views import (
     register_user_view, login_user
)

urlpatterns = [
    path('register', register_user_view),
    path('login', login_user)

]