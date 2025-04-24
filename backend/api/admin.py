from django.contrib import admin
from .models import Cargo, EmailVerification, Truck, Profile

@admin.register(Cargo)
class CargoAdmin(admin.ModelAdmin):
    list_display = ('loading_city_primary', 'unloading_city_primary', 'date_from', 'cargo_type', 'hidden')
    search_fields = ('loading_city_primary', 'unloading_city_primary', 'cargo_type')
    list_filter = ('cargo_type', 'transport_type', 'humanitarian_aid', 'hidden')

@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at')
    search_fields = ('user__username', 'code')

@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    list_display = ('loading_city', 'unloading_city', 'vehicle_type', 'loading_date_from')
    search_fields = ('loading_city', 'unloading_city', 'vehicle_type')
    list_filter = ('vehicle_type', 'has_gps')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'company', 'preferred_language')
    search_fields = ('user__username', 'company')

    
from .models import CompanyDocument  # если еще не импортировано выше

@admin.register(CompanyDocument)
class CompanyDocumentAdmin(admin.ModelAdmin):
    list_display = ('user', 'file', 'uploaded_at', 'is_approved', 'is_rejected')
    list_filter = ('is_approved', 'is_rejected', 'uploaded_at')
    list_editable = ('is_approved', 'is_rejected')
    search_fields = ('user__username',)
