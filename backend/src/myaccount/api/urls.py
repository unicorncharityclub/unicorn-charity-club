from .views import MyaccountViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', MyaccountViewSet)
urlpatterns = router.urls