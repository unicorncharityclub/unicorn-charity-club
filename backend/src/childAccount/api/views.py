from rest_framework import viewsets

from childAccount.models import ChildAccount
from .serializers import ChildAccountSerializer


class ChildAccountViewSet(viewsets.ModelViewSet):

    serializer_class = ChildAccountSerializer
    queryset = ChildAccount.objects.all()


