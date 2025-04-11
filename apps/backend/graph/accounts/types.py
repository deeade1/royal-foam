import graphene
from django.contrib.auth import get_user_model
from graphene import Node, ObjectType
from graphene_django.types import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType

User = get_user_model()


class UserNode(OptimizedDjangoObjectType):

    class Meta:
        model = get_user_model()
        interfaces = (Node,)
        fields = "__all__"
        filter_fields = {
            "first_name": ["exact", "icontains", "istartswith"],
            
        }

    def resolve_contact(self, info):
        if self.email:
            return self.email
        return self.phone_number


