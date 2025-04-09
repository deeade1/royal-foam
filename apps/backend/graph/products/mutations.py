import graphene
from django.contrib.auth.models import AnonymousUser
from graphene import ID, Field, InputObjectType, String, relay
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_relay import from_global_id

from graph.products.types import (
    CategoryNode,
    ProductMediaNode,
    ProductNode,
    ThumbnailNode,
)
from products.models import Category, Product, ProductMedia, Thumbnail


class CreateProduct(relay.ClientIDMutation):
    product = Field(ProductNode)
    product_image = Field(ProductMediaNode)
    success = String()

    class Input:
        name = String(required=True)
        slug = String(required=True)
        description = String(required=True)
        category = ID(required=True)
        product_type = ID()
        weight = graphene.Float()
        rating = graphene.Float()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("You must be logged in to perform this action.")

        try:
            category_id = from_global_id(input.get("category"))[1]
            category = Category.objects.get(pk=category_id)
        except (ObjectDoesNotExist, ValueError, IndexError):
            raise GraphQLError("Invalid category ID.")

        product_type = None
        if input.get("product_type"):
            try:
                product_type_id = from_global_id(input.get("product_type"))[1]
                product_type = ProductType.objects.get(pk=product_type_id)
            except (ObjectDoesNotExist, ValueError, IndexError):
                raise GraphQLError("Invalid product type ID.")

        files = info.context.FILES.get("imageItem")

        try:
            product = Product.objects.create(
                name=input.get("name"),
                slug=input.get("slug"),
                description=input.get("description"),
                category=category,
                product_type=product_type,
                weight=input.get("weight"),
                rating=input.get("rating"),
            )

            img_obj = None
            if files:
                img_obj = ProductImage.objects.create(product=product, image=files)

            return CreateProduct(
                product=product,
                product_image=img_obj,
                success="Product created successfully.",
            )
        except Exception as e:
            raise GraphQLError(f"Error creating product: {str(e)}")


class UpdateProduct(relay.ClientIDMutation):
    # The input arguments for this mutation
    class Input:
        id = graphene.ID()
        name = String(required=True)
        slug = String(required=True)
        description = String(required=True)
        category = ID(required=True)
        product_type = ID()
        # created_at = graphene.types.datetime.DateTime()
        # updated_at = graphene.types.datetime.DateTime()
        weight = graphene.Float()
        rating = graphene.Float()

    # Let's define the response of the mutation
    product = graphene.Field(ProductNode)

    def mutate_and_get_payload(self, info, **input):
        product = Product.objects.get(pk=from_global_id(id)[1])
        user = info.context.user
        if isinstance(user, AnonymousUser):
            raise GraphQLError("You must be logged in to perform this action.")

            product_name = input.get("product_name")
            description = input.get("description")
            category_global_id = input.get("category")
            category_id = from_global_id(category_global_id)[1]
            category_obj = Category.objects.get(pk=category_id)

            product_type_global_id = input.get("product_type")
            product_type_obj = None
            if product_type_global_id:
                product_type_id = from_global_id(product_type_global_id)[1]
                product_type_obj = ProductType.objects.get(pk=product_type_id)

            files = info.context.FILES.get("imageItem")

            product_obj = Product(
                product_name=product_name,
                description=description,
                category=category_obj,
                product_type=product_type_obj,
            )
            product_obj.save()

            if files:
                img_obj = ProductImage(product=product_obj, image=files)
                img_obj.save()
            else:
                img_obj = None

            return CreateProduct(
                product=product_obj,
                product_image=img_obj,
                success="Product created successfully.",
            )

        return UpdateProduct(product=product)


class DeleteProduct(relay.ClientIDMutation):
    class Input:
        # The input arguments for this mutation
        id = graphene.ID()

    # The class attributes define the response of the mutation
    product = graphene.Field(ProductNode)

    def mutate_and_get_payload(self, info, id):
        product = Product.objects.get(pk=from_global_id(id)[1])

        product.delete()
        return DeleteProduct(product=product)


class CategoryCreate(relay.ClientIDMutation):
    class Input:
        name = String(required=True)
        slug = String(required=True)
        description = String(required=True)
        parent_id = ID()
        background_image_alt = String()

    success = graphene.String()
    category_create = graphene.Field(CategoryNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        parent_id = input.get("parent_id")
        parent = None

        if parent_id:
            try:
                parent = from_global_id(parent_id)[1]
                parent = Category.objects.get(pk=parent)
            except (Category.DoesNotExist, Exception) as e:
                return CategoryCreate(success=f"Error: {str(e)}")

        background_image = info.context.FILES.get("imageItem", None)

        try:
            category_create = Category.objects.create(
                parent=parent,
                name=input.get("name"),
                slug=input.get("slug"),
                description=input.get("description"),
                background_image_alt=input.get("background_image_alt"),
                background_image=background_image,
            )
            return CategoryCreate(
                category_create=category_create,
                success="Category created successfully.",
            )
        except Exception as e:
            return CategoryCreate(success=f"Error: {str(e)}")


class UpdateCategory(relay.ClientIDMutation):
    class Input:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String()

    # The class attributes define the response of the mutation
    product_category = graphene.Field(ProductCategoryNode)

    def mutate_and_get_payload(self, info, id, name):
        product_category = ProductCategory.objects.get(pk=id)
        category.name = name if name is not None else category.name
        category.save()
        # Notice we return an instance of this mutation
        return UpdateCategory(category=category)


class DeleteCategory(relay.ClientIDMutation):
    class Input:
        # The input arguments for this mutation
        id = graphene.ID()

        # The class attributes define the response of the mutation

    product_category = graphene.Field(ProductCategoryNode)

    def mutate_and_get_payload(self, info, id):
        product_category = ProductCategory.objects.get(pk=id)
        if product_category is not None:
            # Notice we don't do category.delete()? Thats because we must not
            product_category.delete()
        # Notice we return an instance of this mutation
        return DeleteCategory(product_category=product_category)

class ProductMediaCreate(relay.ClientIDMutation):
    class Input:
        product_id =graphene.ID()
     
    success = graphene.String()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("You must be logged in to perform this action.")

        try:
            product_id = from_global_id(input.get("category"))[1]
            product = Product.objects.get(pk=product_id)
        except (ObjectDoesNotExist, ValueError, IndexError):
            raise GraphQLError("Invalid category ID.")
        
        files = info.context.FILES.get("imageItem")
        #files = info.context.FILES
        
        return ProductMediaCreat(
                product=product,
                success="Product created successfully.",
            )
    

class ProductMutation(graphene.ObjectType):
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()

    category_create = CategoryCreate.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()

