import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from marketing.models import ContactUs, Subscribe
from graph.marketing.types import ContactUsNode, SubscribeNode


class MarketingQuery(graphene.ObjectType):
    # Single object queries
    contact_us = Node.Field(ContactUsNode)  
    subscribe = Node.Field(SubscribeNode)  

    # List queries with filtering
    all_contact_us = DjangoFilterConnectionField(ContactUsNode)  
    all_subscribe = DjangoFilterConnectionField(SubscribeNode)  
