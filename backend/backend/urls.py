from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
<<<<<<< Updated upstream
<<<<<<< Updated upstream
from api.views import (
    CreateUserView, UserProfileAPIView, add_cargo_view, TruckViewSet, CargoViewSet,
    VerifyEmailCodeView, TruckListCreateView, validate_company_code,
    CompanyDocumentUploadView, check_documents_approval
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

from django.conf import settings
from django.conf.urls.static import static
=======
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from api.views import CargoViewSet, CreateUserView, add_cargo_view, VerifyEmailCodeView
>>>>>>> Stashed changes
=======
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from api.views import CargoViewSet, CreateUserView, add_cargo_view, VerifyEmailCodeView
>>>>>>> Stashed changes

router = DefaultRouter()
router.register(r'cargo', CargoViewSet)
router.register(r'trucks', TruckViewSet, basename='truck')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # ✅ вот здесь без 'backend.'
    path("api/", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('', TemplateView.as_view(template_name="api/home.html"), name='home'),
    path('registration/', TemplateView.as_view(template_name='api/registrationCarrier.html'), name='registration'),
    path('login/', TemplateView.as_view(template_name='api/login.html'), name='login'),
    path('add-cargo/', add_cargo_view, name='add_cargo'),
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    path('api/user/profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('api/user/verify/', VerifyEmailCodeView.as_view(), name='verify'),
    path('trucks/', TruckListCreateView.as_view(), name='truck-list-create'),
    path("api/validate-company-code/", validate_company_code, name="validate-company-code"),
    path('api/company/upload-documents/', CompanyDocumentUploadView.as_view(), name='upload-documents'),
    path('api/company/check-approval/', check_documents_approval, name='check-documents-approval'),
]

# ✅ Добавляем отдачу media файлов только в режиме разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
]
>>>>>>> Stashed changes
=======
]
>>>>>>> Stashed changes
