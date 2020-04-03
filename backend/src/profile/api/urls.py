from django.urls import path
from profile.api import views


urlpatterns = [
    path('<str:user_email>', views.ProfileDetailView.as_view()),
    path('childrens/<str:user_email>', views.ChildrenListView.as_view()),
    path('addchild/<str:user_email>', views.AddChildView.as_view()),
]
