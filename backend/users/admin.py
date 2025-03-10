from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Fields to display in the admin list view
    list_display = ('id', 'mobile', 'is_active', 'is_staff', 'is_superuser')
    # Fields to filter by
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    # Fields to search for
    search_fields = ('mobile',)
    # Fields to display in the form view
    fieldsets = (
        (None, {'fields': ('mobile', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    # Fields to display when creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('mobile', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )
    ordering = ('id',)

# Register the model with the custom admin class
admin.site.register(CustomUser, CustomUserAdmin)
