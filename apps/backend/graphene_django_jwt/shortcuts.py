from accounts.models import User
from graphene_django_jwt.exceptions import JSONRefreshTokenExpired
from graphene_django_jwt.utils import (
    get_payload,
    get_user_by_payload,
    jwt_encode,
    jwt_payload,
)


def get_token(user, **extra):
    """
    Get token for user
    """
    payload = jwt_payload(user)
    payload.update(extra)
    return jwt_encode(payload)


def get_user_by_token(token):
    """
    Get user by token
    """
    payload = get_payload(token)
    email = payload.get("email")
    phone_number = payload.get("phone_number")

    if email:
        return User.objects.get(email=email)
    elif phone_number:
        return User.objects.get(phone_number=phone_number)
    else:
        return None


def get_refresh_token(token):
    """
    Get refresh token
    """
    from .models import RefreshToken

    try:
        return RefreshToken.objects.get(token=token, revoked__isnull=True)
    except RefreshToken.DoesNotExist:
        raise JSONRefreshTokenExpired
