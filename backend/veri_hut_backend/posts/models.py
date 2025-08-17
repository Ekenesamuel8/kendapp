from django.db import models

# posts/models.py

class Post(models.Model):
    text = models.TextField()
    media = models.FileField(upload_to="posts/", null=True, blank=True)  # Image or video
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post at {self.created_at}"
