# posts/serializers.py

from rest_framework import serializers
from .models import Post #Wallet, CustomUser

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
"""
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['wallet_address', 'created_at']

class CustomUserSerializer(serializers.ModelSerializer):
    wallets = WalletSerializer(many=True, read_only=True)  # Nested serializer to include wallets

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'profile_picture', 'wallets']
        """