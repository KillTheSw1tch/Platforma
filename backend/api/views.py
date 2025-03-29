from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, viewsets, status
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Cargo, EmailVerification
from .serializers import CargoSerializer, UserSerializer
from .forms import CargoForm
import random
from rest_framework.views import APIView
from rest_framework.response import Response

# Регистрация с отправкой кода
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save(is_active=False)  # создаём, но не активируем
        code = str(random.randint(100000, 999999))  # 6-значный код

        # сохраняем код в БД
        EmailVerification.objects.create(user=user, code=code)

        print(f"[DEBUG] Отправка кода {code} на {user.email} с почты {settings.DEFAULT_FROM_EMAIL}")
        
        # отправляем письмо
        send_mail(
            subject='Код подтверждения регистрации',
            message=f'Привет, {user.username}! Ваш код подтверждения: {code}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        print(f"Код отправлен на {user.email}: {code}")  
class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
    
def add_cargo_view(request):
    if request.method == 'POST':
        form = CargoForm(request.POST)
        if form.is_valid():
            form.save()  # Створюємо запис у БД
            return redirect('cargo-success')  # Перенаправляємо, наприклад, на сторінку успіху
    else:
        form = CargoForm()
    
    return render(request, 'api/add_cargo.html', {'form': form})

class UserProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    
class VerifyEmailCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')

        if not email or not code:
            return Response({'error': 'Email и код обязательны'}, status=400)

        try:
            user = User.objects.get(email=email)
            verification = EmailVerification.objects.get(user=user)

            if verification.code == code:
                user.is_active = True
                user.save()
                verification.delete()  # удаляем код после подтверждения
                return Response({'message': 'Аккаунт успешно подтверждён!'}, status=200)
            else:
                return Response({'error': 'Неверный код'}, status=400)

        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=404)
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Код не найден'}, status=404)

