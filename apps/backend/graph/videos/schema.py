import graphene
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from videos.models import Video
from graph.videos.types import VideoNode

class VideoQuery(graphene.ObjectType):
    all_videos = DjangoFilterConnectionField(VideoNode)
    video = Node.Field(VideoNode)
