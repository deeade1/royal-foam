import asyncio

import graphene
from graphene_django.debug import DjangoDebug

from graph.accounts.mutations import AccountMutations
from graph.accounts.schema import AccountQueries
from graph.blog.schema import BlogQuery
#from graph.products.mutations import ProductMutation
from graph.videos.schema import VideoQuery
from graph.blog.mutations import BlogMutations
from graph.products.schema import ProductQueries


class Query(
    AccountQueries,
    BlogQuery,
    ProductQueries,
    VideoQuery
):
    pass


class Mutation(
    AccountMutations,
    BlogMutations,
   #ProductMutation,
    
):

    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
)
