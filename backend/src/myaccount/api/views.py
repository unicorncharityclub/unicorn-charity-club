from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView
   )
from ..models import Myaccount
from .serializers import MyaccountSerializer


class MyaccountListView(ListAPIView):
    queryset = Myaccount.objects.all()
    serializer_class = MyaccountSerializer


class MyaccountDetailView(RetrieveAPIView):
    queryset = Myaccount.objects.all()
    serializer_class = MyaccountSerializer