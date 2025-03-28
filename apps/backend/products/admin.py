from django.contrib import admin

from .models import ProductCategory, Product, ProductMedia, Thumbnail


@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    model = Thumbnail


class CatAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(ProductCategory, CatAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductMedia)
