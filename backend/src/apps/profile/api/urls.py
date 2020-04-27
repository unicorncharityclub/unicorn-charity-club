from django.urls import path
from apps.profile.api import views

urlpatterns = [
    path('view_profile', views.ProfileDetailView.as_view()),
    path('childrens/<str:user_email>', views.ChildrenListView.as_view()),
]
