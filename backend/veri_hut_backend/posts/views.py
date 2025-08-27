# posts/views.py

from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
#from rest_framework import status
from .models import Post#, Wallet
from .serializers import PostSerializer#, CustomUserSerializer
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
#from rest_framework.permissions import IsAuthenticated, BasePermission
#from rest_framework.views import APIView


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]


"""
class WalletPermission(BasePermission):
    def has_permission(self, request, view):
        # Assuming request.user will be set if wallet authentication is successful
        return request.user is not None

class VerifyWalletView(APIView):
    permission_classes = [WalletPermission]  # Custom permission for wallet authentication

    def post(self, request):
        # Get the user from the authenticated request
        user = request.user

        # Return user details along with the associated wallet addresses
        user_data = CustomUserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)




"""
