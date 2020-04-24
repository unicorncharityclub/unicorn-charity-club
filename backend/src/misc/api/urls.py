from django.urls import path
from misc.api import views

urlpatterns = [
    path('<slug:slug>/', views.MiscPageDetailsView.as_view()),
]
