from rest_framework import viewsets
from ..models import Myaccount
from .serializers import MyaccountSerializer


class MyaccountViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = MyaccountSerializer
    queryset = Myaccount.objects.all()