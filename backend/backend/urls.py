from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from api.views import CreateUserView, UserProfileAPIView, add_cargo_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from api.views import CargoViewSet, VerifyEmailCodeView


router = DefaultRouter()
router.register(r'cargo', CargoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('', TemplateView.as_view(template_name="api/home.html"), name='home'),
    path('registration/', TemplateView.as_view(template_name='api/registrationCarrier.html'), name='registration'),
    path('login/', TemplateView.as_view(template_name='api/login.html'), name='login'),
    path('add-cargo/', add_cargo_view, name='add_cargo'),
    path('api/user/profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('user/register/', CreateUserView.as_view(), name='register'), 
    path('user/verify/', VerifyEmailCodeView.as_view(), name='verify'),  
]
