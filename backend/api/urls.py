from django.urls import path
from .views import CreateUserView, VerifyEmailCodeView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),  # 🔥
    path('user/verify/', VerifyEmailCodeView.as_view(), name='verify'),  # 🔥
]
