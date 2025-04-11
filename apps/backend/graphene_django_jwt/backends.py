from django.contrib.auth import get_user_model
from django.db.models import Q

from .shortcuts import get_user_by_token
from .utils import get_credentials, get_payload

UserModel = get_user_model()


class JSONWebTokenBackend:
    def authenticate(self, request=None, **kwargs):
        if request is None or getattr(request, "_jwt_token_auth", False):
            return None

        token = get_credentials(request, **kwargs)

        if token is not None:
            payload = get_payload(token)
            if "email" in payload:
                user = UserModel.objects.filter(
                    Q(email=payload["email"]) | Q(phoneNumber=payload["email"])
                ).first()
            elif "phoneNumber" in payload:
                user = UserModel.objects.filter(
                    Q(email=payload["phoneNumber"])
                    | Q(phoneNumber=payload["phoneNumber"])
                ).first()
        else:
            return None

        if user is not None:
            return user

        return None

    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User._default_manager.get(pk=user_id)
        except User.DoesNotExist:
            return None


