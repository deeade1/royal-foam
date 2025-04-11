from graphene import Node
from graphene_django import DjangoObjectType
from marketing.models import ContactUs, Subscribe


class ContactUsNode(OptimizedDjangoObjectType):
    class Meta:
        model = ContactUs  
        fields = "__all__"
        filter_fields = {
            "full_name": ["exact", "icontains", "istartswith"],
            "email": ["exact", "icontains"],
            "subject": ["exact", "icontains"],
            "message": ["icontains"],
            "agree": ["exact"],  
        }
        interfaces = (Node,)


class SubscribeNode(OptimizedDjangoObjectType):
    class Meta:
        model = Subscribe  
        fields = "__all__"
        filter_fields = {
            "email": ["exact", "icontains"],  
        }
        interfaces = (Node,)
