from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Cargo

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        allow_blank=False,
        label="Email",
        error_messages={
            "unique": "Пользователь с таким email уже существует.",
        }
    )

    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Этот email уже используется.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        
    def create(self, validated_data):
        user =  User.objects.create_user(**validated_data)
        return user

class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'
