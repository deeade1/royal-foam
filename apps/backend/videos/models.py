from django.db import models

class Video(models.Model):
    title = models.CharField(max_length=255, unique=True)
    media = models.FileField(upload_to="video-media", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
