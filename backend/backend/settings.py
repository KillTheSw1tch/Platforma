from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

DEFAULT_CHARSET = 'utf-8'

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key
SECRET_KEY = 'django-insecure-1pch%x!zq9zu7sylr5u-00e%0pk2bexo2o7yn@az3gbsg=1q7u'

# Debug mode
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = ["*"]

# REST framework settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        'rest_framework.permissions.AllowAny',  # Разрешаем любые запросы
    ],
}

# JWT settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'rest_framework',
    'corsheaders',
]

# Middleware settings
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # В начало, чтобы CORS работал корректно
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL configuration
ROOT_URLCONF = 'backend.urls'

# Templates settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['backend/api/templates'],
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

# WSGI application
WSGI_APPLICATION = 'backend.wsgi.application'

# Database settings (SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings
CORS_ALLOW_ALL_ORIGINS = True
<<<<<<< Updated upstream

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
]

CORS_ALLOW_HEADERS = [
    'Accept',
    'Authorization',
    'Content-Type',
    'X-CSRFToken',
    'X-Requested-With',
]

# Email configuration (Gmail and Outlook)
=======
CORS_ALLOWS_CREDENTIALS = True


# =============================
# Email конфигурация Gmail и Outlook
# =============================

# Gmail
>>>>>>> Stashed changes
GMAIL_HOST = 'smtp.gmail.com'
GMAIL_PORT = 587
GMAIL_USE_TLS = True
GMAIL_USER = os.getenv('GMAIL_USER')
GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD')

<<<<<<< Updated upstream
=======
# Outlook
>>>>>>> Stashed changes
OUTLOOK_HOST = 'smtp.office365.com'
OUTLOOK_PORT = 587
OUTLOOK_USE_TLS = True
OUTLOOK_USER = os.getenv('OUTLOOK_USER')
OUTLOOK_PASSWORD = os.getenv('OUTLOOK_PASSWORD')

<<<<<<< Updated upstream
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'mishafeshannnn@gmail.com'
EMAIL_HOST_PASSWORD = 'mqifddrlbbxmvyot'                                 
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:5174',
    'http://localhost:5174',
]
CORS_ALLOWS_CREDENTIALS = True

import os

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
=======

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = GMAIL_HOST
EMAIL_PORT = GMAIL_PORT
EMAIL_USE_TLS = GMAIL_USE_TLS
EMAIL_HOST_USER = GMAIL_USER
EMAIL_HOST_PASSWORD = GMAIL_PASSWORD
DEFAULT_FROM_EMAIL = GMAIL_USER
>>>>>>> Stashed changes
