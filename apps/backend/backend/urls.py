from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.contrib.sitemaps.views import sitemap
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.decorators.cache import cache_page
import requests
from .views import health_check
#from accounts

from .sitemaps import sitemaps  # Import the complete sitemaps dict

def prerender(request, path=""):
    """
    Proxy request to React frontend in development mode.
    In production, serve built React static files instead.
    """
    if settings.DEBUG:
        try:
            resp = requests.get(f'http://localhost:3000/{path}')
            return HttpResponse(resp.text)
        except requests.ConnectionError:
            return HttpResponse("React frontend is not running.", status=502)
    return HttpResponse("React frontend should serve this route in production.", status=404)

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health_check'),
    path('', health_check), 
    
    # GraphQL API (secured with JWT)
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=settings.DEBUG))),

    # SEO: Sitemap & Robots.txt
    path('sitemap.xml', cache_page(86400)(sitemap), {'sitemaps': sitemaps}),
    path('robots.txt', cache_page(86400)(TemplateView.as_view(
        template_name="robots.txt",
        content_type="text/plain"
    ))),

    # Include other app URLs (Example)
    #path('accounts/', include('accounts.urls')),
    #path('blog/', include('blog.urls')),

    # Catch-all: React frontend in dev
    re_path(r'^.*$', cache_page(60 * 15)(prerender)), 
]

# Debug Toolbar & Media Files (Only for Development)
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
