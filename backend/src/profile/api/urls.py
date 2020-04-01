from .views import account_details, get_child_list, \
    add_child_details
from django.urls import path
from profile.api import views


urlpatterns = [
    path('<str:user_email>', account_details),
    path('childrens/<str:user_email>', get_child_list),
    path('addchild/<str:user_email>', add_child_details),
    path('user_test/<str:user_email>/', views.ProfileDetail.as_view()),
]
