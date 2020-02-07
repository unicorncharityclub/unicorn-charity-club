from django.urls import path

from .views import (
    MyaccountListView,
    MyaccountDetailView

)

urlpatterns = [
    path('', MyaccountListView.as_view()),
    path('<pk>', MyaccountDetailView.as_view())

]