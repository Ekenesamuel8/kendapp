# posts/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet#, VerifyWalletView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    #path('verify-wallet/', VerifyWalletView.as_view(), name='verify-wallet'),
    path('', include(router.urls)),
]

urlpatterns = router.urls