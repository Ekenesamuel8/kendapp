from django.db import models
#from django.contrib.auth.models import AbstractUser

# posts/models.py

class Post(models.Model):
    text = models.TextField()
    media = models.FileField(upload_to="posts/", null=True, blank=True)  # Image or video
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post at {self.created_at}"

"""
class CustomUser(AbstractUser):
    # Adding custom fields to the user model
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    # Any other custom fields you want can be added here.

    def __str__(self):
        return self.username


class Wallet(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="wallets")
    wallet_address = models.CharField(max_length=255, unique=True)  # Wallet address (public key)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Wallet {self.wallet_address} for {self.user.username}"
        """