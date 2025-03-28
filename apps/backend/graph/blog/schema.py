import graphene
from django.contrib.auth import get_user_model
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from blog.models import Category, Comment, Post, Reply, Tag
from graph.accounts.types import UserNode
from graph.blog.types import (
    CategoryNode, 
    CommentNode, 
    PostNode, 
    ReplyNode, 
    TagNode, 
    TestimonialNode
)

User = get_user_model()


class BlogQuery(graphene.ObjectType):
    all_posts = DjangoFilterConnectionField(PostNode)
    author_by_first_name = graphene.Field(
        UserNode, first_name=graphene.String(required=True)
    )
    post_by_slug = graphene.Field(PostNode, slug=graphene.String(required=True))
    posts_by_author = DjangoFilterConnectionField(
        PostNode, first_name=graphene.String(required=True)
    )
    posts_by_tag = DjangoFilterConnectionField(
        PostNode, tag=graphene.String(required=True)
    )
    comment = Node.Field(CommentNode)
    all_comments = DjangoFilterConnectionField(CommentNode)
    category = Node.Field(CategoryNode)
    all_categories = DjangoFilterConnectionField(CategoryNode)
    reply = Node.Field(ReplyNode)
    all_replies = DjangoFilterConnectionField(ReplyNode)
    all_tags = DjangoFilterConnectionField(TagNode)
    tag = Node.Field(TagNode)
    testimonial = Node.Field(TestimonialNode)
    all_testimonials = DjangoFilterConnectionField(TestimonialNode)

    def resolve_all_posts(root, info, **kwargs):
        return Post.objects.prefetch_related("tags").select_related("author").all()

    def resolve_author_by_first_name(root, info, first_name):
        return User.objects.get(first_name=first_name)

    def resolve_post_by_slug(root, info, slug):
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .get(slug=slug)
        )

    def resolve_posts_by_author(root, info, first_name):
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .filter(author__first_name=first_name)
        )

    def resolve_posts_by_tag(root, info, tag):
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .filter(tags__name__iexact=tag)
        )


