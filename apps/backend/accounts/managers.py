from django.apps import apps
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def _create_user(
        self, email=None, phone_number=None, password=None, **extra_fields
    ):
        if not email and not phone_number:
            raise ValueError(_("Either email or phone_number must be set"))

        User = apps.get_model("accounts", "User")  # Get the User model dynamically

        user = User(**extra_fields)

        if email:
            user.email = email
        elif phone_number:
            user.phone_number = phone_number

        if password is not None:
            user.set_password(password)

        user.save(using=self._db)
        return user

    def create_user(self, email=None, phone_number=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        if not email and not phone_number:
            raise ValueError("Either email or phone_number must be set")

        print("Creating user...")  # Add this line for debugging
        user = self._create_user(
            email=email, phone_number=phone_number, password=password, **extra_fields
        )
        return user

    def create_superuser(
        self, email=None, phone_number=None, password=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not extra_fields["is_staff"]:
            raise ValueError("Superuser must have is_staff=True.")

        if not extra_fields["is_superuser"]:
            raise ValueError("Superuser must have is_superuser=True.")

        if not email and not phone_number:
            raise ValueError("Either email or phone_number must be set for superuser.")

        print("Creating superuser...")  # Add this line for debugging
        user = self._create_user(
            email=email, phone_number=phone_number, password=password, **extra_fields
        )
        return user
