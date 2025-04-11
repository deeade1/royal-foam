from functools import wraps

from graphql.execution.execute import GraphQLResolveInfo

from graphene_django_jwt.exceptions import PermissionDenied

from .constants import Messages
from .exceptions import WrongUsage


def context(f):
    def decorator(func):
        def wrapper(*args, **kwargs):
            info = next(arg for arg in args if isinstance(arg, GraphQLResolveInfo))
            return func(info.context, *args, **kwargs)

        return wrapper

    return decorator


def user_passes_test(test_func):
    def decorator(f):
        @wraps(f)
        @context(f)
        def wrapper(context, *args, **kwargs):
            if test_func(context.user):
                return f(*args, **kwargs)
            raise PermissionDenied()

        return wrapper

    return decorator


login_required = user_passes_test(lambda u: u.is_authenticated)
staff_member_required = user_passes_test(lambda u: u.is_active and u.is_staff)
superuser_required = user_passes_test(lambda u: u.is_active and u.is_superuser)


def permission_required(perm):
    def check_perms(user):
        if isinstance(perm, str):
            perms = (perm,)
        else:
            perms = perm
        if user.has_perms(perms):
            return True
        return False

    return user_passes_test(check_perms)


def login_required(fn):
    @wraps(fn)
    def wrapper(cls, root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            return cls(success=False, errors=Messages.UNAUTHENTICATED)
        return fn(cls, root, info, **kwargs)

    return wrapper


def verification_required(fn):
    @wraps(fn)
    @login_required
    def wrapper(cls, root, info, **kwargs):
        user = info.context.user
        if not user.status.verified:
            return cls(success=False, errors=Messages.NOT_VERIFIED)
        return fn(cls, root, info, **kwargs)

    return wrapper


def secondary_email_required(fn):
    @wraps(fn)
    @verification_required
    def wrapper(cls, root, info, **kwargs):
        user = info.context.user
        if not user.status.secondary_email:
            return cls(success=False, errors=Messages.SECONDARY_EMAIL_REQUIRED)
        return fn(cls, root, info, **kwargs)

    return wrapper


def password_confirmation_required(fn):
    @wraps(fn)
    def wrapper(cls, root, info, **kwargs):
        try:
            field_name = next(
                i for i in kwargs.keys() if i in ["password", "old_password"]
            )
            password = kwargs[field_name]
        except Exception:
            raise WrongUsage(
                """
                @password_confirmation is supposed to be used on
                mutations with 'password' or 'old_password' field required.
                """
            )
        user = info.context.user
        if user.check_password(password):
            return fn(cls, root, info, **kwargs)
        errors = {field_name: Messages.INVALID_PASSWORD}
        return cls(success=False, errors=errors)

    return wrapper
