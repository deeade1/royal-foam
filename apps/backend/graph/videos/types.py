from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django_optimizer import OptimizedDjangoObjectType
from videos.models import Video


class VideoNode(OptimizedDjangoObjectType):
    class Meta:
        model = Video
        fields = "__all__"
        filter_fields = {
            "title": ["exact", "icontains", "istartswith"],
        }
        interfaces = (Node,)