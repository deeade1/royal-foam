from graphene import Node
from graphene_django import DjangoObjectType

from blog.models import Category, Comment, Post, Reply, Tag, Testimonial
from graphene_django_optimizer import OptimizedDjangoObjectType

# schema.py
import graphene
from graphene_django import DjangoObjectType



class TagNode(OptimizedDjangoObjectType):
    class Meta:
        model = Tag
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class CategoryNode(OptimizedDjangoObjectType):
    class Meta:
        model = Category
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)


class CommentNode(OptimizedDjangoObjectType):
    class Meta:
        model = Comment
        fields = "__all__"
        filter_fields = {
            "post": ["exact"],
            "name": ["exact", "icontains", "istartswith"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


# schema.py
class PostNode(OptimizedDjangoObjectType):
    structured_data = graphene.JSONString()
    meta_tags = graphene.JSONString()
    canonical_url = graphene.String()

    class Meta:
        model = Post
        interfaces = (Node,)
        filter_fields = {
            'slug': ['exact'],
            'category__slug': ['exact'],
        }

    def resolve_structured_data(self, info):
        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": self.title,
            "description": self.meta_description,
            "datePublished": self.publish_date.isoformat(),
            "author": {
                "@type": "Person",
                "name": self.author.get_full_name()
            },
            "image": self.featured_image.url if self.featured_image else None
        }

    def resolve_meta_tags(self, info):
        return {
            "title": f"{self.title} | {SITE_NAME}",
            "description": self.meta_description,
            "og_type": "article",
            "twitter_card": "summary_large_image"
        }

    def resolve_canonical_url(self, info):
        return f"{SITE_URL}/blog/{self.slug}/"

class ReplyNode(OptimizedDjangoObjectType):
    class Meta:
        model = Reply
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "comment": ["exact"],
            "created_at": ["exact", "gte", "lte"],
        }
        interfaces = (Node,)


class TestimonialNode(OptimizedDjangoObjectType):
    class Meta:
        model = Testimonial
        fields = "__all__"
        filter_fields = {
            "title": ["exact", "icontains", "istartswith"],
            "author__first_name": ["exact", "icontains"],
            "date_created": ["exact", "gt", "lt"],
        }
        interfaces = (Node,)
