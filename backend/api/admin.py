from django.contrib import admin
from .models import Cargo


@admin.register(Cargo)
class CargoAdmin(admin.ModelAdmin):
    list_display = (
        'loading_city_primary', 
        'unloading_city_primary', 
        'cargo_type', 
        'date_from', 
        'price'
    )
    search_fields = ('loading_city_primary', 'unloading_city_primary', 'cargo_type')
    list_filter = ('date_from', 'cargo_type')