from django.db import models
from django.contrib.auth.models import User

class Cargo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cargos')
    loading_city_primary = models.CharField(max_length=255)
    loading_postal_primary = models.CharField(max_length=20, blank=True, null=True)
    loading_city_secondary = models.CharField(max_length=255, blank=True, null=True)
    loading_postal_secondary = models.CharField(max_length=20, blank=True, null=True)
    unloading_city_primary = models.CharField(max_length=255)
    unloading_postal_primary = models.CharField(max_length=20, blank=True, null=True)
    unloading_city_secondary = models.CharField(max_length=255, blank=True, null=True)
    unloading_postal_secondary = models.CharField(max_length=20, blank=True, null=True)
    date_from = models.DateField()
    date_to = models.DateField(blank=True, null=True)
    cargo_type = models.CharField(max_length=255)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    volume = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    length = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    width = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    transport_type = models.IntegerField(default=0)
    truck_count = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    price_currency = models.CharField(max_length=10, blank=True, null=True)
    price_per_unit = models.CharField(max_length=20, blank=True, null=True)
    humanitarian_aid = models.BooleanField(default=False)
    extra_info = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # Додаткові поля для опцій (loading options, conditions, documents, тощо) можна зберігати як JSONField або окремі BooleanFields
    
    def __str__(self):
        return f"{self.loading_city_primary} -> {self.unloading_city_primary}"