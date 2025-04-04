from .base import *
from decouple import config

DEBUG = config("DEBUG", cast=bool, default=True)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('POSTGRES_DB'),
        'USER': config('POSTGRES_USER'),
        'PASSWORD': config('POSTGRES_PASSWORD'),
        'HOST': config('PGHOST'),
        'PORT': config('PGPORT', cast=int, default=5432),
    }
}

#INSTALLED_APPS += []
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
