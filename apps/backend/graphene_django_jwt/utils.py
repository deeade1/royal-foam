from calendar import timegm
from datetime import datetime

import jwt
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from graphene_django_jwt.exceptions import JSONWebTokenError, JSONWebTokenExpired
from graphene_django_jwt.settings import jwt_settings


def jwt_payload(user, **kwargs):
    """
    Generate JWT payload
    """
    payload = {
        "id": str(user.id),
        "exp": datetime.utcnow() + jwt_settings.GRAPHENE_DJANGO_JWT_EXPIRATION_DELTA,
        "origIat": timegm(datetime.utcnow().utctimetuple()),
        **kwargs,
    }

    return payload


def jwt_encode(payload):
    """
    Encode JWT payload
    """
    return jwt.encode(
        payload,
        jwt_settings.GRAPHENE_DJANGO_JWT_SECRET_KEY,
        jwt_settings.GRAPHENE_DJANGO_JWT_ALGORITHM,
    )


def jwt_decode(token):
    """
    Decode JWT token
    """
    return jwt.decode(
        token,
        jwt_settings.GRAPHENE_DJANGO_JWT_SECRET_KEY,
        options={
            "verify_exp": True,
        },
        algorithms=[jwt_settings.GRAPHENE_DJANGO_JWT_ALGORITHM],
    )


def get_authorization_header(request):
    """
    Get authorization header from request
    """
    auth = request.META.get(
        jwt_settings.GRAPHENE_DJANGO_JWT_AUTH_HEADER_NAME, ""
    ).split()
    prefix = jwt_settings.GRAPHENE_DJANGO_JWT_AUTH_HEADER_PREFIX

    if len(auth) != 2 or auth[0].lower() != prefix.lower():
        return None
    return auth[1]


def get_credentials(request, **kwargs):
    """
    Get credentials from request
    """
    return get_authorization_header(request)


def get_payload(token):
    """
    Get JWT payload from token
    """
    try:
        payload = jwt_decode(token)
    except jwt.ExpiredSignatureError:
        raise JSONWebTokenExpired()
    except jwt.DecodeError:
        raise JSONWebTokenError(_("Error decoding signature"))
    except jwt.InvalidTokenError:
        raise JSONWebTokenError(_("Invalid token"))
    return payload


def get_user_by_payload(payload):
    """
    Get user by payload
    """
    user_id = payload.get("id", None)
    if not user_id:
        raise JSONWebTokenError(_("Invalid JWT Payload"))
    user = get_user_model().objects.filter(id=user_id).first()

    if user is not None and not user.is_active:
        raise JSONWebTokenError(_("User is disabled"))
    return user


def refresh_has_expired(orig_iat):
    """
    Check if token refresh has expired
    """
    now = timegm(datetime.utcnow().utctimetuple())
    expires = (
        orig_iat
        + jwt_settings.GRAPHENE_DJANGO_JWT_REFRESH_EXPIRATION_DELTA.total_seconds()
    )
    return now > expires


def create_refresh_token(user):
    """
    Create refresh token
    """
    from graphene_django_jwt.models import RefreshToken

    return RefreshToken.objects.create(user=user)
