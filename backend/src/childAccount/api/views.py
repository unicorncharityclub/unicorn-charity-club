from rest_framework.generics import ListAPIView, RetrieveAPIView

from childAccount.models import ChildAccount
from .serializers import ChildAccountSerializer


class ChildAccountListView(ListAPIView):
    queryset = ChildAccount.objects.all()
    serializer_class = ChildAccountSerializer


class ChildAccountDetailView(RetrieveAPIView):
    queryset = ChildAccount.objects.all()
    serializer_class = ChildAccountSerializer
