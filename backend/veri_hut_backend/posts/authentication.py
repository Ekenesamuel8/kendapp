# posts/authentication.py
""""
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from eth_account import Account
from .models import Wallet

class WalletAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Get wallet address and signature from request headers or body
        wallet_address = request.data.get("walletAddress")
        signature = request.data.get("signature")
        
        if not wallet_address or not signature:
            return None  # No wallet address or signature, skip authentication
        
        # Recover the wallet address from the signature
        message = "Please sign this message to authenticate."
        try:
            recovered_address = Account.recover_message(message, signature=signature)
        except Exception as e:
            raise AuthenticationFailed("Invalid signature.")

        # Compare the recovered address with the wallet address in the database
        if recovered_address.lower() != wallet_address.lower():
            raise AuthenticationFailed("Invalid wallet address or signature.")
        
        # Check if the wallet exists in the database and get the user
        try:
            wallet = Wallet.objects.get(wallet_address=wallet_address)
        except Wallet.DoesNotExist:
            raise AuthenticationFailed("Wallet not registered.")
        
        return (wallet.user, None)  # Return the user object
"""