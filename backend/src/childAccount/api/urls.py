from .views import ChildAccountViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', ChildAccountViewSet)
urlpatterns = router.urls

