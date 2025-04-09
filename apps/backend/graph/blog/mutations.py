import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphql_relay import from_global_id
from graphql import GraphQLError
from blog.models import Post, Comment, Category, Reply, Testimonial, Tag
from graph.blog.types import CommentNode, PostNode, CategoryNode, TestimonialNode, ReplyNode,TagNode
from graph.accounts.types import UserNode
from graphene_django_jwt.decorators import login_required



class CreateCategory(relay.ClientIDMutation):
    class Input:
        # The input arguments for this mutation
        title = graphene.String()

    category = graphene.Field(CategoryNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        title = input.get('title')
        
        # Create a new post category
        category = Category(title=title)
        category.save()
        
        # Return the created post category
        return CreateCategory(category=category)
      
class UpdateCategory(relay.ClientIDMutation):
  class Input:
    # The input arguments for this mutation 
    id = graphene.ID()
    name = graphene.String()

  # The class attributes define the response of the mutation
  category = graphene.Field(CategoryNode)

  def mutate_and_get_payload(self, info, id, name):
    category = Category.objects.get(pk=id)
    category.name = name if name is not None else category.name
    category.save()
    # Notice we return an instance of this mutation 🤷‍♀️
    return UpdateCategory(category=category)


class DeleteCategory(relay.ClientIDMutation):
  class Input:
    # The input arguments for this mutation
    id = graphene.ID()

  # The class attributes define the response of the mutation
  category = graphene.Field(CategoryNode)

  def mutate_and_get_payload(self, info, id):
    category = Category.objects.get(pk=id)
    if category is not None:
      # Notice we don't do category.delete()? Thats because we must not 😓
      category.delete()
    # Notice we return an instance of this mutation 🤷‍♀️
    return DeleteCategory(category=category)



class CreateComment(relay.ClientIDMutation):
    class Input:
        content = graphene.String()
        post_id = graphene.ID()

    comment = graphene.Field(CommentNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, content, post_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged in to perform this action.')
        
        post = Post.objects.get(pk=from_global_id(id)[1])
        comment = Comment.objects.create(
          author=user, content=content, post=post
        )
        return CreateComment(comment=comment)

class UpdateComment(relay.ClientIDMutation):
  # The input arguments for this mutation
  class Input:
    id = graphene.ID()
    content = graphene.String()
    # Let's define the response of the mutation
  comment = graphene.Field(CommentNode)
  
  @classmethod
  def mutate_and_get_payload(self, info, **input):
    comment = Comment.objects.get(pk=from_global_id(id)[1])
    comment.save()
    # Notice we return an instance of this mutation 
    return UpdateComment(comment=comment)


class DeleteComment(relay.ClientIDMutation):
  class Input:
    # The input arguments for this mutation
    id = graphene.ID()

  # The class attributes define the response of the mutation
  comment = graphene.Field(CommentNode)
  @classmethod
  def mutate_and_get_payload(self, info, id):
    comment = Comment.objects.get(pk=id)
    if comment is not None:
      comment.delete()
    return DeleteComment(comment=comment)


class CreatePost(relay.ClientIDMutation):
    class Input:
        title = graphene.String()
        overview = graphene.String()
        content = graphene.String()
        category = graphene.ID()
        featured = graphene.Boolean()
        created_on = graphene.types.datetime.DateTime()
        last_modified = graphene.types.datetime.DateTime()

    author = graphene.Field(UserNode)
    post = graphene.Field(PostNode)
    categories = graphene.Field(CategoryNode)
    success = graphene.String()
    

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged in to perform this action.')
        
        
        thumbnail = info.context.FILES
        if thumbnail:
            post.thumbnail = thumbnail
        post = Post.objects.create(
            title=input.get("title"),
            overview=input.get("overview"),
            content=input.get("content"),
            author=input.get("user"),
            featured=input.get("featured"),
        
            thumbnail=input.get("thumbnail"),
            #created_on=created_on,
            #last_modified=last_modified
        )
        category=[]
        if category is not None:
            category_set = []
        for category_id in category:
            category_object = Category.objects.get(pk=from_global_id(id)[1])
            category_set.append(category_object)
            post.category.set(category_set)
        post.save()

        return CreatePost(post=post, success='User updated successfully.')


class UpdatePost(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()
        title = graphene.String()
        overview = graphene.String()
        content = graphene.String()
        category = graphene.ID()
        featured = graphene.Boolean()
        created_on = graphene.types.datetime.DateTime()
        last_modified = graphene.types.datetime.DateTime()

    # Let's define the response of the mutation
    author = graphene.Field(UserNode)
    post = graphene.Field(PostNode)
    categories = graphene.Field(CategoryNode)
    success = graphene.String()
    @classmethod
    def mutate_and_get_payload(self, info, **input):
        if user.is_anonymous:
            raise GraphQLError('You must be logged in to perform this action.')
        
        thumbnail = info.context.FILES
        if thumbnail:
            post.thumbnail = thumbnail
            
        post = Post.objects.create(
            title=input.get("title"),
            overview=input.get("overview"),
            content=input.get("content"),
            author=input.get("user"),
            featured=input.get("featured"),
        
            thumbnail=input.get("thumbnail"),
            #created_on=created_on,
            #last_modified=last_modified
        )
        category=[]
        if category is not None:
            category_set = []
        for category_id in category:
            category_object = Category.objects.get(pk=from_global_id(id)[1])
            category_set.append(category_object)
            post.category.set(category_set)
        post.save()
        # Notice we return an instance of this mutation 🤷‍♀️
        return UpdatePost(post=post)


class DeletePost(relay.ClientIDMutation):
  class Input:
    # The input arguments for this mutation
    id = graphene.ID()

  # The class attributes define the response of the mutation
  post = graphene.Field(PostNode)
  @classmethod
  def mutate_and_get_payload(self, info, id):
    post = Post.objects.get(pk=id)
    if post is not None:
      post.delete()
    return DeletePost(post=post)

# ✅ Mutation to Create a Tag
class CreateTag(relay.ClientIDMutation):
    class Input:
        name = graphene.String(required=True)

    tag = graphene.Field(TagNode)

    def mutate_and_get_payload(self, info, name):
        if not name:
            raise GraphQLError("Tag name cannot be empty.")
        
        tag = Tag.objects.create(name=name)
        return CreateTag(tag=tag)


# ✅ Mutation to Create a Reply
class CreateReply(relay.ClientIDMutation):
    class Input:
        comment_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        body = graphene.String(required=True)

    reply = graphene.Field(ReplyNode)

    def mutate_and_get_payload(self, info, comment_id, name, body):
        try:
            comment = Comment.objects.get(pk=comment_id)
        except Comment.DoesNotExist:
            raise GraphQLError("Comment not found.")

        reply = Reply.objects.create(comment=comment, name=name, body=body)
        return CreateReply(reply=reply)


   

class CreateTestimonial(relay.ClientIDMutation):
    class Input:
        title = graphene.String(required=True)
        body = graphene.String(required=True)
        media = graphene.String()  # Expecting a file path or base64-encoded data

    testimonial = graphene.Field(TestimonialNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required!")

        testimonial = Testimonial(
            title=input.get("title"),
            body=input.get("body"),
            author=user,  # Assign logged-in user
            media=input.get("media"),
        )
        testimonial.save()

        return CreateTestimonial(testimonial=testimonial)

# ✅ Mutation to Delete Testimonial
class DeleteTestimonial(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required!")

        try:
            testimonial = Testimonial.objects.get(pk=input.get("id"), author=user)
            testimonial.delete()
            return DeleteTestimonial(success=True)
        except Testimonial.DoesNotExist:
            raise GraphQLError("Testimonial not found or permission denied.")

# ✅ Mutation to Update Testimonial
class UpdateTestimonial(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        title = graphene.String()
        body = graphene.String()
        media = graphene.String()

    testimonial = graphene.Field(TestimonialNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError("Authentication required!")

        try:
            testimonial = Testimonial.objects.get(pk=input.get("id"), author=user)
            if input.get("title"):
                testimonial.title = input.get("title")
            if input.get("body"):
                testimonial.body = input.get("body")
            if input.get("media"):
                testimonial.media = input.get("media")

            testimonial.save()
            return UpdateTestimonial(testimonial=testimonial)
        except Testimonial.DoesNotExist:
            raise GraphQLError("Testimonial not found or permission denied.")


 
class BlogMutations(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_post = UpdatePost.Field()
    delete_post = DeletePost.Field()
    
    create_comment = CreateComment.Field()
    update_comment = UpdateComment.Field()
    delete_commnet = DeleteComment.Field() 
    
    create_category = CreateCategory.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()
    
    create_tag = CreateTag.Field()
    create_reply = CreateReply.Field()
    
    create_testimonial = CreateTestimonial.Field()
    update_testimonial = UpdateTestimonial.Field()
    delete_testimonial = DeleteTestimonial.Field()
