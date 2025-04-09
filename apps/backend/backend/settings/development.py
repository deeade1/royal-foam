from .base import *
from decouple import config

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('POSTGRES_DB', default='root'),
        'USER': config('POSTGRES_USER', default='root'),
        'PASSWORD': config('POSTGRES_PASSWORD', default='root'),
        'HOST': config('PGHOST', default='royal-db'),
        'PORT': config('PGPORT', cast=int, default=5432),
        'OPTIONS': {
            'connect_timeout': 5,
        },
    }
}

# Replace with:
if DEBUG:
    INSTALLED_APPS += ["debug_toolbar"]
    MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
# Allow GraphiQL in development
GRAPHENE["GRAPHIQL"] = True