from .views import account_details, get_child_list, \
    add_child_details
from django.urls import path

urlpatterns = [
    path('<str:user_emailid>', account_details),
    path('childrens/<str:user_emailid>', get_child_list),
    path('addchild/<str:user_emailid>/', add_child_details)
]
