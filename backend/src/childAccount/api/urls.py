from django.urls import path

from .views import (
    ChildAccountListView,
    ChildAccountDetailView

)

urlpatterns = [
    path('', ChildAccountListView.as_view()),
    path('<pk>', ChildAccountDetailView.as_view())

]