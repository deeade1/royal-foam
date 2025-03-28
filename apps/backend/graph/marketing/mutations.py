import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from marketing.models import ContactUs, Subscribe
from graph.marketing.types import ContactUsNode, SubscribeNode


class CreateContactUs(relay.ClientIDMutation):
    class Input:
        full_name = graphene.String(required=True)
        email = graphene.String(required=True)
        subject = graphene.String(required=True)
        message = graphene.String(required=True)
        agree = graphene.Boolean(required=True)

    contact_us = graphene.Field(ContactUsNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        full_name = input.get("full_name")
        email = input.get("email")
        subject = input.get("subject")
        message = input.get("message")
        agree = input.get("agree")

        # Create a new ContactUs instance
        contact_us = ContactUs(
            full_name=full_name,
            email=email,
            subject=subject,
            message=message,
            agree=agree,
        )
        contact_us.save()

        return CreateContactUs(contact_us=contact_us)


class CreateSubscribe(relay.ClientIDMutation):
    class Input:
        email = graphene.String(required=True)

    subscribe = graphene.Field(SubscribeNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        email = input.get("email")

        # Validate email
        if not email:
            raise GraphQLError("Email is required.")

        # Create a new Subscribe instance
        subscribe = Subscribe(email=email)
        subscribe.save()

        return CreateSubscribe(subscribe=subscribe)
