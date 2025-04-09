import asyncio

from graphene import Field, ObjectType

from graph.blog.types import CommentNode, PostNode


# Define Subscription type
class BlogSubscriptions(ObjectType):
    newPost = Field(PostNode)
    newComment = Field(CommentNode)

    async def subscribe_newPost(root, info):
        while True:
            # Implement logic to subscribe to new post events
            # For example, you could use asyncio to listen for new post events in real-time
            yield new_post
            await asyncio.sleep(1)

    async def subscribe_newComment(root, info):
        while True:
            # Implement logic to subscribe to new comment events
            # For example, you could use asyncio to listen for new comment events in real-time
            yield new_comment
            await asyncio.sleep(1)


class BlogSubscriptions(ObjectType):
    newPost = Field(PostNode)
    newComment = Field(CommentNode)

    async def subscribe_newPost(root, info):
        # Logic to subscribe to new post events
        while True:
            # Retrieve new post data from somewhere
            new_post_data = await get_new_post_data()
            # Yield the new post data to subscribers
            yield new_post_data
            # Wait for new post event
            await asyncio.sleep(1)

    async def subscribe_newComment(root, info):
        # Logic to subscribe to new comment events
        while True:
            # Retrieve new comment data from somewhere
            new_comment_data = await get_new_comment_data()
            # Yield the new comment data to subscribers
            yield new_comment_data
            # Wait for new comment event
            await asyncio.sleep(1)
