from django.db import models
from django.contrib.auth.models import User

class Cargo(models.Model):
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cargos')
    loading_city_primary = models.CharField(max_length=255)
    loading_postal_primary = models.CharField(max_length=20, blank=True, null=True)
    loading_city_secondary = models.CharField(max_length=255, blank=True, null=True)
    loading_postal_secondary = models.CharField(max_length=20, blank=True, null=True)
    unloading_city_primary = models.CharField(max_length=255)
    unloading_postal_primary = models.CharField(max_length=20, blank=True, null=True)
    unloading_city_secondary = models.CharField(max_length=255, blank=True, null=True)
    unloading_city_secondary = models.CharField(max_length=255, blank=True, null=True)
    cargo_unloading_street = models.CharField(max_length=255, blank=True, null=True)
    cargo_loading_street = models.CharField(max_length=20, blank=True, null=True)
    date_from = models.DateField()
    email = models.EmailField(max_length=40, blank=True, null=True)
    date_to = models.DateField(blank=True, null=True)
    cargo_type = models.CharField(max_length=255)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    volume = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    length = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    width = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    transport_type = models.CharField(max_length=30, blank=True, null=True)
    truck_count = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    price_currency = models.CharField(max_length=10, blank=True, null=True)
    price_per_unit = models.CharField(max_length=20, blank=True, null=True)
    humanitarian_aid = models.BooleanField(default=False)
    extra_info = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    loading_canton = models.CharField(max_length=100, null=True)    # Новое поле
    unloading_canton = models.CharField(max_length=100, null=True)  # Новое поле
    phone_number = models.CharField(max_length=20, null=True)        # Новое поле
    viber_whatsapp_number = models.CharField(max_length=20, null=True)  # Новое поле
    hidden = models.BooleanField(default=False)  # ⬅️ Добавь это поле
    # Додаткові поля для опцій (loading options, conditions, documents, тощо) можна зберігати як JSONField або окремі BooleanFields
    
    def __str__(self):
        return f"{self.loading_city_primary} -> {self.unloading_city_primary}"
    
class EmailVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.user.username} - {self.code}'
    
class Truck(models.Model):
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trucks')
    loading_date_from = models.DateField()
    loading_date_to = models.DateField()
    loading_location = models.CharField(max_length=255)
    additional_loading_location = models.CharField(max_length=255, blank=True, null=True)
    vehicle_type = models.CharField(max_length=100)
    loading_canton = models.CharField(max_length=100, null=True)
    unloading_canton = models.CharField(max_length=100, null=True)
    loading_city = models.CharField(max_length=100, null=True)
    unloading_city = models.CharField(max_length=100, null=True)
    truck_unloading_street = models.CharField(max_length=255, blank=True, null=True)
    truck_loading_street = models.CharField(max_length=20, blank=True, null=True)
    number_of_vehicles = models.PositiveIntegerField()
    carrying_capacity = models.FloatField(blank=True, null=True)
    useful_volume = models.FloatField(blank=True, null=True)
    length = models.FloatField(blank=True, null=True)
    width = models.FloatField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    email = models.EmailField(max_length=40, blank=True, null=True)
    phone = models.CharField(max_length=20)
    unloading_postal = models.CharField(max_length=20, blank=True, null=True)
    loading_postal = models.CharField(max_length=20, blank=True, null=True)
    whatsapp = models.CharField(max_length=100, blank=True, null=True)
    has_gps = models.BooleanField(default=False)
    additional_info = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"Грузовик → {self.loading_city} -> {self.unloading_city}"
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    preferred_language = models.CharField(max_length=20, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    canton = models.CharField(max_length=50, blank=True, null=True)
    client_type = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} Profile'
