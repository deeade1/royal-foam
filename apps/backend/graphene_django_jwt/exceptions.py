from django.utils.translation import gettext_lazy as _


class GraphQLAuthError(Exception):
    default_message = None

    def __init__(self, message=None):
        if message is None:
            message = self.default_message

        super().__init__(message)


class UserAlreadyVerified(GraphQLAuthError):
    default_message = _("User already verified.")


class InvalidCredentials(GraphQLAuthError):
    default_message = _("Invalid credentials.")


class UserNotVerified(GraphQLAuthError):
    default_message = _("User is not verified.")


class EmailAlreadyInUse(GraphQLAuthError):
    default_message = _("This email is already in use.")


class TokenScopeError(GraphQLAuthError):
    default_message = _("This token if for something else.")


class PasswordAlreadySetError(GraphQLAuthError):
    default_message = _("Password already set for account.")


class WrongUsage(GraphQLAuthError):
    """
    internal exception
    """

    default_message = _("Wrong usage, check your code!.")


class GrapheneDjangoJWTBaseException(Exception):
    default_message = _("You do not have permission to perform this action")
    code = 401


class JSONWebTokenError(GrapheneDjangoJWTBaseException):
    pass


class PermissionDenied(GrapheneDjangoJWTBaseException):
    default_message = _("You do not have permission to perform this action")
    code = 401


class JSONWebTokenExpired(GrapheneDjangoJWTBaseException):
    default_message = _("Signature has expired")
    code = 401


class JSONRefreshTokenExpired(GrapheneDjangoJWTBaseException):
    default_message = _("Refresh token has expired")
    code = 401
