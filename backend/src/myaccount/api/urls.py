from .views import get_account_details, update_account_details, get_child_list, \
    get_child_details, add_child_details
from django.urls import path

urlpatterns = [
    path('<str:user_emailid>', get_account_details),
    path('<str:user_emailid>/', update_account_details),
    path('<str:user_emailid>', get_child_list),
    path('child/<str:child_emailid>/', get_child_details),
    path('addchild/<str:user_emailid>/', add_child_details)
]
