import graphene
from django.contrib.auth import get_user_model
from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from graph.products.types import ProductCategoryNode, ProductMediaNode, ProductNode
from products.models import Product, ProductCategory, ProductMedia

User = get_user_model()

# Define Query Class
class ProductQueries(graphene.ObjectType):
    product = graphene.relay.Node.Field(ProductNode)
    all_products = DjangoFilterConnectionField(ProductNode)
    product_by_slug = graphene.Field(ProductNode, slug=graphene.String(required=True))
    search_products = graphene.List(ProductNode, name=graphene.String())
    all_product_media = DjangoFilterConnectionField(ProductMediaNode)

    def resolve_product_by_slug(self, info, slug):
        try:
            return Product.objects.get(slug=slug)
        except Product.DoesNotExist:
            return None

    def resolve_search_products(self, info, name=None):
        if name:
            return Product.objects.filter(name__icontains=name)
        return Product.objects.all()