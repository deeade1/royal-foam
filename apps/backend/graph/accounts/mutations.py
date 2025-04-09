import difflib
import re
from calendar import timegm

import graphene
import jwt
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.db import transaction
from graphene import ID, Float, Int, List, NonNull, String, relay
from graphene.types.generic import GenericScalar
from graphql import GraphQLError
from graphql_relay import from_global_id
from jwt import ExpiredSignatureError


from graph.accounts.types import  UserNode
from graphene_django_jwt import signals
from graphene_django_jwt.blacklist import Blacklist
from graphene_django_jwt.decorators import login_required
from graphene_django_jwt.exceptions import (
    JSONRefreshTokenExpired,
    JSONWebTokenExpired,
    PermissionDenied,
)
from graphene_django_jwt.models import RefreshToken
from graphene_django_jwt.shortcuts import get_refresh_token, get_token
from graphene_django_jwt.signals import refresh_finished
from graphene_django_jwt.utils import (
    create_refresh_token,
    get_payload,
    jwt_encode,
    jwt_payload,
)

UserModel = get_user_model()


class RevokeAllTokensMutation(relay.ClientIDMutation):
    revoked_tokens = List(NonNull(String), required=True)

    class Input:
        pass  # No input fields are needed for this mutation

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        revoked_tokens = []
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError(Messages.UNAUTHENTICATED)

        user_id = user.id
        refresh_tokens = RefreshToken.objects.filter(
            user_id=user_id, revoked__isnull=True
        ).all()

        for rt in refresh_tokens:
            rt.revoke()
            revoked_tokens.append(rt.get_token())

        return RevokeAllTokensMutation(revoked_tokens=revoked_tokens)


class ObtainJSONWebTokenMutation(relay.ClientIDMutation):
    token = String(required=True)
    refresh_token = String(required=True)
    user = graphene.Field(UserNode)

    class Input:
        contact = String(required=True)  # Accepts email or phone number
        password = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        contact = input.get("contact")
        password = input.get("password")

        is_email = "@" in contact

        if is_email:
            email = contact
            phone_number = None
        else:
            email = None
            phone_number = contact

        if not (phone_number or email):
            raise GraphQLError("Either phone number or email is required.")

        User = get_user_model()

        user = None
        if phone_number:
            user = User.objects.filter(phone_number=phone_number).first()
        elif email:
            user = User.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            raise GraphQLError("Invalid phone number or email or password.")

        if not user.is_active:
            raise GraphQLError("User account is not active.")

        refresh_token = create_refresh_token(user)
        token = get_token(user)

        user_logged_in.send(sender=cls, request=info.context, user=user)

        return ObtainJSONWebTokenMutation(
            token=token, refresh_token=refresh_token, user=user
        )


class RefreshMutation(relay.ClientIDMutation):
    token = String(required=True)
    payload = GenericScalar(required=True)
    refreshToken = String(
        required=True
    )  # Update to match the field name in the mutation query

    class Input:
        refreshToken = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            refresh_token = input.get(
                "refreshToken"
            )  # Retrieve refreshToken from input
            refresh_token_instance = get_refresh_token(refresh_token)

            if refresh_token_instance.revoked:
                raise GraphQLError("Refresh token has been revoked")
            if refresh_token_instance.is_expired():
                raise JSONRefreshTokenExpired

            refreshed_token = refresh_token_instance.rotate()
            payload = jwt_payload(
                refresh_token_instance.user, refresh_token=refreshed_token.get_token()
            )
            token = jwt_encode(payload)
            print("Token:", token)
            refresh_finished.send(
                sender=RefreshToken,
                user=refresh_token_instance.user,
                request=info.context,
            )
            return RefreshMutation(
                token=token, payload=payload, refreshToken=refreshed_token.get_token()
            )
        except Exception as e:
            raise GraphQLError(str(e))


class RevokeMutation(relay.ClientIDMutation):
    revoked = Int(required=True)

    class Input:
        refresh_token = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        refresh_token = input.get("refresh_token")
        try:
            refresh_token = get_refresh_token(refresh_token)
            refresh_token.revoke()
            return RevokeMutation(revoked=timegm(refresh_token.revoked.timetuple()))
        except Exception as e:
            raise GraphQLError(str(e))


class VerifyMutation(relay.ClientIDMutation):
    payload = graphene.types.generic.GenericScalar(required=True)

    class Input:
        token = graphene.String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            token = input.get(
                "token"
            )  # Access the 'token' value from the input dictionary
            payload = get_payload(token)
            if Blacklist.is_blacklisted(payload["refresh_token"]):
                raise GraphQLError("Token is blacklisted.")
            return VerifyMutation(payload=payload)
        except Exception as e:
            raise GraphQLError(str(e))


class LogoutMutation(relay.ClientIDMutation):
    success = graphene.Boolean(required=True)

    class Input:
        refresh_token = graphene.String(required=False)

    @classmethod
    @login_required  # Decorate the method with login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            refresh_token = input.get(
                "refresh_token"
            )  # Retrieve the refresh_token from the input dictionary
            if refresh_token:
                refresh_token_obj = get_refresh_token(refresh_token)
                refresh_token_obj.revoke()
            user_logged_out.send(
                sender=cls, request=info.context, user=info.context.user
            )
            return LogoutMutation(success=True)
        except Exception as e:
            raise GraphQLError(str(e))


MIN_PASSWORD_LENGTH = 8  # Minimum password length requirement


class SignUpMutation(relay.ClientIDMutation):
    token = graphene.String(required=True)
    user = graphene.Field(UserNode)

    class Input:
        contact = graphene.String(required=True)  # Accepts email or phone number
        password = graphene.String(required=True)

    @classmethod
    @transaction.atomic
    def mutate_and_get_payload(cls, root, info, **input):
        contact = input.get("contact")
        password = input.get("password")

        is_email = "@" in contact

        if is_email:
            email = contact
            phone_number = None
        else:
            email = None
            phone_number = contact

        if not email and not phone_number:
            raise GraphQLError("Either email or phone number is required.")

        User = get_user_model()
        existing_user = None
        if email:
            existing_user = User.objects.filter(email=email).first()
        elif phone_number:
            existing_user = User.objects.filter(phone_number=phone_number).first()

        if existing_user:
            raise GraphQLError(
                "A user with the same email or phone number already exists."
            )

        if len(password) < MIN_PASSWORD_LENGTH:
            raise GraphQLError(
                f"The password must be at least {MIN_PASSWORD_LENGTH} characters long."
            )

        if not re.search(r"\d", password) or not re.search(r"[a-zA-Z]", password):
            raise GraphQLError("The password must contain both letters and numbers.")

        if email and difflib.SequenceMatcher(None, password, email).ratio() > 0.8:
            raise GraphQLError("The password is too similar to the email.")

        user = User.objects.create_user(
            email=email if email else None,
            phone_number=phone_number if phone_number else None,
            password=password,
        )

        refresh_token = create_refresh_token(user)
        token = get_token(user)

        user_logged_in.send(sender=user.__class__, request=info.context, user=user)

        return SignUpMutation(token=token, user=user)


class UpdateUserMutation(relay.ClientIDMutation):
    user = graphene.Field(UserNode)
    success = graphene.String()

    class Input:
        user_id = graphene.ID(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
    

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user_id = from_global_id(input.get("user_id"))[1]
        user = UserModel.objects.get(pk=user_id)
        first_name = input.get("first_name")
        last_name = input.get("last_name")

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name

        user.save()

        return UpdateUserMutation(
            user=user, success="User updated successfully."
        )



class AccountMutations(graphene.ObjectType):
    sign_in = ObtainJSONWebTokenMutation.Field(required=True)
    sign_up = SignUpMutation.Field(required=True)
    logout = LogoutMutation.Field(required=True)
    refresh_token = RefreshMutation.Field(required=True)
    revoke_token = RevokeMutation.Field(required=True)
    verify_token = VerifyMutation.Field(required=True)
    revoke_all_tokens = RevokeAllTokensMutation.Field(required=True)
    logout = LogoutMutation.Field(required=True)
    update_user = UpdateUserMutation.Field(required=True)
    
