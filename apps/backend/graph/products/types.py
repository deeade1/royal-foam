from graphene import Node, String, JSONString
from graphene_django import DjangoObjectType
from products.models import ProductCategory, Product, ProductMedia, Thumbnail
from graphene_django_optimizer import OptimizedDjangoObjectType
from django.conf import settings

class ProductCategoryNode(OptimizedDjangoObjectType):
    structured_data = JSONString()
    meta_tags = JSONString()
    canonical_url = String()

    class Meta:
        model = ProductCategory
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "children": ["exact"],
            "parent": ["exact"],
            "products": ["exact"],
            "thumbnails": ["exact"],
        }
        interfaces = (Node,)

    def resolve_structured_data(self, info):
        return {
            "@context": "https://schema.org",
            "@type": "Category",
            "name": self.name,
            "description": self.description,
            "url": f"{settings.SITE_URL}/categories/{self.slug}/",
            "image": self.image.url if self.image else None
        }

    def resolve_meta_tags(self, info):
        return {
            "title": f"{self.name} | {settings.SITE_NAME}",
            "description": self.description[:160] if self.description else None,
            "og_type": "website"
        }

    def resolve_canonical_url(self, info):
        return f"{settings.SITE_URL}/categories/{self.slug}/"


class ProductNode(OptimizedDjangoObjectType):
    structured_data = JSONString()
    meta_tags = JSONString()
    canonical_url = String()

    class Meta:
        model = Product
        fields = "__all__"
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "slug": ["exact", "icontains", "istartswith"],
            "created_at": ["exact", "gte", "lte"],
            "product_category": ["exact"],
        }
        interfaces = (Node,)

    def resolve_structured_data(self, info):
        offers = {
            "@type": "Offer",
            "priceCurrency": "NGN",
            "price": str(self.price),
            "availability": "https://schema.org/InStock" if self.in_stock else "https://schema.org/OutOfStock"
        }

        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": self.name,
            "description": self.description,
            "brand": {
                "@type": "Brand",
                "name": settings.SITE_NAME
            },
            "offers": offers,
            "image": [media.image.url for media in self.media.all() if media.type == 'IMAGE'],
            "url": f"{settings.SITE_URL}/products/{self.slug}/"
        }

    def resolve_meta_tags(self, info):
        return {
            "title": f"{self.name} | {settings.SITE_NAME}",
            "description": self.meta_description or self.description[:160],
            "og_type": "product",
            "twitter_card": "summary_large_image"
        }

    def resolve_canonical_url(self, info):
        return f"{settings.SITE_URL}/products/{self.slug}/"


class ProductMediaNode(OptimizedDjangoObjectType):
    class Meta:
        model = ProductMedia
        fields = "__all__"
        filter_fields = {
            "product": ["exact"],
            "type": ["exact"],
            "thumbnails": ["exact"],
        }
        interfaces = (Node,)


class ThumbnailNode(OptimizedDjangoObjectType):
    class Meta:
        model = Thumbnail
        fields = "__all__"
        filter_fields = {
            "product_category": ["exact"],
            "product_media": ["exact"],
            "size": ["exact"],
        }
        interfaces = (Node,)