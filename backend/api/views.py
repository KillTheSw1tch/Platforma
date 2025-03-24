from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Cargo
from .serializers import CargoSerializer
from .forms import CargoForm


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
    permission_classes = [IsAuthenticated]
    
def add_cargo_view(request):
    if request.method == 'POST':
        form = CargoForm(request.POST)
        if form.is_valid():
            form.save()  # Створюємо запис у БД
            return redirect('cargo-success')  # Перенаправляємо, наприклад, на сторінку успіху
    else:
        form = CargoForm()
    
    return render(request, 'api/add_cargo.html', {'form': form})