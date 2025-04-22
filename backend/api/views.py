import json
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, viewsets, status
from .serializers import ExtendedUserSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Cargo, EmailVerification, Truck
from .serializers import CargoSerializer, UserSerializer, TruckSerializer, ProfileSerializer
from .forms import CargoForm
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

import logging

logger = logging.getLogger(__name__)
        
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ExtendedUserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
            try:
                user = serializer.save()
                code = str(random.randint(100000, 999999))
                
                # Логування отриманих даних з фронтенду
                print("[DEBUG] Received request:")
                print(json.dumps(self.request.data, indent=4, ensure_ascii=False))  # Виведе отримані дані в гарному форматі
                
                EmailVerification.objects.create(user=user, code=code)
                self.send_verification_email(user, code)
            except Exception as e:
                print(f"[ERROR] Error creating a user: {e}")

    def send_verification_email(self, user, code):
        subject = 'Код підтвердження реєстрації'.encode('utf-8')
        message = f'Привіт, {user.username}! Ваш код підтвердження: {code}'.encode('utf-8')
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        try:
            send_mail(
                subject.decode('utf-8'),  # Декодуємо перед відправкою
                message.decode('utf-8'),  # Декодуємо перед відправкою
                from_email,
                recipient_list,
                fail_silently=False,
            )
            print("[DEBUG] Email was sent successfully.")
        except Exception as e:
            print(f"[ERROR] Error sending an email: {e}")
        
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

class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ExtendedUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Повертаємо дані поточного користувача
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        profile_data = request.data.pop('profile', {})

        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Оновлюємо профіль окремо
        profile_serializer = ProfileSerializer(user.profile, data=profile_data, partial=True)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
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
                verification.delete()  # Удаляем код после подтверждения

                # Генерируем JWT токен
                refresh = RefreshToken.for_user(user)

                # Отправляем токен в ответе
                return Response({
                    'message': 'Аккаунт успешно подтверждён!',
                    'token': str(refresh.access_token),  # Токен отправляется на фронт
                }, status=200)

            else:
                return Response({'error': 'Неверный код'}, status=400)

        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=404)
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Код не найден'}, status=404)


class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer

class TruckListCreateView(generics.ListCreateAPIView):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer 