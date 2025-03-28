from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticViewSitemap
from django.views.generic import TemplateView
from django.http import HttpResponse
import requests
from django.views.decorators.cache import cache_page
from blog.models import Post

def prerender(request, path):
    # Forward request to React in dev, use prerender.io in production
    resp = requests.get(f'http://localhost:3000/{path}')
    return HttpResponse(resp.text)

post_info = {
    'queryset': Post.objects.published(),
    'date_field': 'publish_date',
}

sitemaps = {
    'static': StaticViewSitemap,
    'blog': GenericSitemap(post_info, priority=0.6),
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    
    # Cached SEO endpoints
    path('sitemap.xml', cache_page(86400)(sitemap), {'sitemaps': sitemaps}),
    path('robots.txt', cache_page(86400)(TemplateView.as_view(
        template_name="robots.txt",
        content_type="text/plain"))),
    
    # Dynamic prerendering with caching
    re_path(r'^.*$', cache_page(60 * 15)(prerender)),
]

# Serve media files during development
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)