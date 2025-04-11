from django.contrib.auth.models import AnonymousUser

from graphene_django_jwt.blacklist import Blacklist
from graphene_django_jwt.shortcuts import get_user_by_token
from graphene_django_jwt.utils import get_credentials, get_payload


def _load_user(request):
    token = get_credentials(request)
    if token is not None:
        refresh_token = get_payload(token)["refresh_token"]
        if Blacklist.is_blacklisted(refresh_token):
            return None
        return get_user_by_token(token)


class JSONWebTokenMiddleware:

    def __init__(self, *args, **kwargs):
        self._skip = False

    def resolve(self, next, root, info, **kwargs):
        if self._skip:
            return next(root, info, **kwargs)
        if not info.context.user.is_authenticated:
            user = _load_user(info.context)
            info.context.user = user or AnonymousUser()
        self._skip = True
        return next(root, info, **kwargs)
    

# middleware.py
class CrawlerLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        if 'googlebot' in user_agent.lower():
            logger.info(f"Googlebot visited: {request.path}")
        return self.get_response(request)
