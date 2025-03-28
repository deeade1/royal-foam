from typing import Any, TypeVar

import pytz
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.indexes import GinIndex
from django.db import models, transaction
from django.db.models import F, JSONField, Max, Q
from phonenumber_field.modelfields import PhoneNumber, PhoneNumberField
from django_resized import ResizedImageField
from .managers import UserManager


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True, unique=True)
    #photo = models.ImageField(upload_to="user-image", blank=True, null=True)
    image = ResizedImageField(size=[1200, 630], upload_to='user-images/')
    username = None
   
    USERNAME_FIELD = "email"  # or 'phone_number'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        ordering = ("email",)
        permissions = (
            ("Manage customers.", "Can manage customers"),
            ("Manage staff.", "Can manage staff"),
            ("Impersonate user.", "Can manage unauthorized user"),
        )
