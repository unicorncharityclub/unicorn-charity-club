from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView
from misc.api.serializers import PageSerializer
from misc.models import Page


class MiscPageDetailsView(RetrieveAPIView):
    authentication_classes = [SessionAuthentication, ]
    permission_classes = [IsAuthenticated]
    model = Page
    serializer_class = PageSerializer
    queryset = Page.objects.all()
    lookup_field = 'slug'
