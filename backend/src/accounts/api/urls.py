from django.urls import path
from accounts.api import views

urlpatterns = [
    path('register', views.UserRegistrationView.as_view()),
    path('login', views.UserLoginView.as_view()),
    path('addchild/<str:user_email>', views.AddChildView.as_view()),
]