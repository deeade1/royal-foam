from pathlib import Path
from decouple import config

# Base Directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Security Settings
SECRET_KEY = config(
    "DJANGO_SECRET_KEY",
    cast=str,
    default='django-insecure-d!##408p=4(4r2kef0xkx)!u9^cui9o(gl2s+safu657!i11_g'
)

DEBUG = config('DEBUG', cast=bool, default=False)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])

# Application Definition
INSTALLED_APPS = [
    "grappelli",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',  
    "accounts",
    "blog",
    "videos",
    "products",
    "marketing",
    "graphene_django",
    "graphene_django_jwt",
    "corsheaders",
    "phonenumber_field",
    "django_filters",
    "mptt",
    "debug_toolbar",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

# Authentication and Graphene Settings
AUTH_USER_MODEL = "accounts.User"
AUTHENTICATION_BACKENDS = [
    "graphene_django_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]

GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
    "SCHEMA_OUTPUT": "backend/schema.graphql",
    "SCHEMA_INDENT": 2,
    "RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST": True,
    "RELAY_CONNECTION_MAX_LIMIT": 100,
    "ATOMIC_MUTATIONS": True,
    "MIDDLEWARE": [
        "graphene_django_jwt.schema.middleware.JSONWebTokenMiddleware",
    ],
}

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = False
'''CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8080",
]'''
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React app's origin
    "http://localhost:8000",
]
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8080",
]
CSRF_COOKIE_SECURE = False 

# Database Configuration
POSTGRES_USER = config('POSTGRES_USER')
POSTGRES_PASSWORD = config('POSTGRES_PASSWORD')
POSTGRES_DB = config('POSTGRES_DB')
PGHOST = config('PGHOST')
PGPORT = config('PGPORT', cast=int, default=5432)

if all([POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, PGHOST]):
    print("Using PostgreSQL")
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': POSTGRES_DB,
            'USER': POSTGRES_USER,
            'PASSWORD': POSTGRES_PASSWORD,
            'HOST': PGHOST,
            'PORT': PGPORT,
        }
    }
else:
    raise ValueError("Database configuration is incomplete. Please check your environment variables.")

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True

# Static and Media Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default Primary Key Field Type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
GRAPPELLI_ADMIN_TITLE = "Royal Foam"



# Templates Configuration
ROOT_URLCONF = 'backend.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Internal IPs for Debug Toolbar
INTERNAL_IPS = [
    "127.0.0.1",
    "localhost",
]

# Logging Configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'django.log',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_FINDERS += ['compressor.finders.CompressorFinder']




# settings.py additions for SEO
INSTALLED_APPS += [
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'robots',
    'meta',
    'compressor',
]

MIDDLEWARE.insert(2, 'backend.middleware.CrawlerLogMiddleware')



# SEO Configuration
SITE_ID = 1

# Dynamic URL handling
SITE_URL = 'https://yourdomain.com' if not DEBUG else 'http://localhost:8000'
ROBOTS_SITEMAP_URLS = [f'{SITE_URL}/sitemap.xml'] if not DEBUG else []
# Cache settings for SEO content
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'TIMEOUT': 60 * 15,  # 15 minutes
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}