from django.contrib.sitemaps import Sitemap, GenericSitemap
from django.urls import reverse
from blog.models import Post
from products.models import Product
from django.utils import timezone

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'weekly'
    lastmod = timezone.now()  # For static pages, use current time

    def items(self):
        return ['home', 'about', 'contact']

    def location(self, item):
        return reverse(item)

class ProductSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
        # Only include active products
        return Product.objects.filter(is_active=True)
        
    def lastmod(self, obj):
        return max(obj.updated_at, obj.created_at)  # Use latest of both dates
        
    def location(self, obj):
        return reverse('product_detail', kwargs={'slug': obj.slug})

# Blog sitemap configuration
post_info = {
    'queryset': Post.objects.published(),
    'date_field': 'publish_date',
}

sitemaps = {
    'static': StaticViewSitemap,
    'blog': GenericSitemap(post_info, priority=0.6),
    'products': ProductSitemap(),  # Using custom sitemap class
}

