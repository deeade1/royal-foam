from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = 'Creates a superuser.'

    def handle(self, *args, **options):
        User = get_user_model()
        DJANGO_SUPERUSER_EMAIL = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        DJANGO_SUPERUSER_PASSWORD = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if DJANGO_SUPERUSER_EMAIL and DJANGO_SUPERUSER_PASSWORD:
            if not User.objects.filter(email=DJANGO_SUPERUSER_EMAIL).exists():
                User.objects.create_superuser(
                    email=DJANGO_SUPERUSER_EMAIL,
                    password=DJANGO_SUPERUSER_PASSWORD
                )
                self.stdout.write(self.style.SUCCESS('Superuser created successfully.'))
            else:
                self.stdout.write(self.style.WARNING('Superuser already exists.'))
        else:
            self.stdout.write(self.style.ERROR('Superuser email and password not provided.'))
