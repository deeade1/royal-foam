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
#ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')], default='localhost,127.0.0.1')
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
]

# Authentication
AUTH_USER_MODEL = "accounts.User"
AUTHENTICATION_BACKENDS = [
    "graphene_django_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]
# Database Configuration (Will be set in specific environments)
DATABASES = {}

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

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8080",
]
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8080",
]
# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True

# Static and Media Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
#STATIC_ROOT = '/usr/share/nginx/html/static/'  # Must match Nginx alias

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

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
]

# SEO Configuration
INSTALLED_APPS += [
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'robots',
    'meta',
    'compressor',
]

MIDDLEWARE.insert(2, 'backend.settings.middleware.CrawlerLogMiddleware')

SITE_ID = 1
