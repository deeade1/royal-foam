from django.db.models.signals import post_delete
from django.dispatch import receiver

from products.models import Thumbnail  # Import the relevant model


@receiver(post_delete, sender=Thumbnail)
def delete_thumbnail_image(sender, instance, **kwargs):
    if image := instance.image:
        image.delete(save=False)
