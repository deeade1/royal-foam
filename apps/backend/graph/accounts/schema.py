import graphene
from django.contrib.auth import get_user_model
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from .types import  UserNode

User = get_user_model()


class AccountQueries(graphene.ObjectType):
    user = Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    def resolve_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        return user
