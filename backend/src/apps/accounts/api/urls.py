from django.urls import path
from accounts.api import views

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path('addchild/', views.AddChildView.as_view()),
    path('switch/', views.UserSwitchAccountView.as_view()),
    path('exit/', views.UserExitView.as_view()),
]