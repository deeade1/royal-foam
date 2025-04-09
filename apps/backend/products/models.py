from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from django_resized import ResizedImageField

# defines the available thumbnail resolutions
THUMBNAIL_SIZES = [32, 64, 128, 256, 512, 1024, 2048, 4096]

DEFAULT_THUMBNAIL_SIZE = 4096

FILE_NAME_MAX_LENGTH = 55


class ThumbnailFormat:
    ORIGINAL = "original"
    AVIF = "avif"
    WEBP = "webp"

    CHOICES = [
        (ORIGINAL, "Original"),
        (AVIF, "AVIF"),
        (WEBP, "WebP"),
    ]


ALLOWED_THUMBNAIL_FORMATS = {ThumbnailFormat.AVIF, ThumbnailFormat.WEBP}

# PIL-supported file formats as found here:
# https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
# Dict structure: {<mime-type>: <PIL-identifier>}
MIME_TYPE_TO_PIL_IDENTIFIER = {
    "image/avif": "AVIF",
    "image/bmp": "BMP",
    "image/dcx": "DCX",
    "image/eps": "EPS",
    "image/gif": "GIF",
    "image/jpeg": "JPEG",
    "image/pcd": "PCD",
    "image/pcx": "PCX",
    "image/png": "PNG",
    "image/x-ppm": "PPM",
    "image/psd": "PSD",
    "image/tiff": "TIFF",
    "image/x-xbitmap": "XBM",
    "image/x-xpm": "XPM",
    "image/webp": "WEBP",
}
PIL_IDENTIFIER_TO_MIME_TYPE = {v: k for k, v in MIME_TYPE_TO_PIL_IDENTIFIER.items()}


# Icon images
ICON_MIME_TYPES = ["image/png"]
MIN_ICON_SIZE = 256


class IconThumbnailFormat:
    """Thumbnail formats for icon images."""

    ORIGINAL = "original"
    WEBP = "webp"

    CHOICES = [
        (ORIGINAL, "Original"),
        (WEBP, "WebP"),
    ]


ALLOWED_ICON_THUMBNAIL_FORMATS = {IconThumbnailFormat.WEBP}


class ProductMediaTypes:
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"

    CHOICES = [
        (IMAGE, "An uploaded image or an URL to an image"),
        (VIDEO, "A URL to an external video"),
    ]


FEET_CHOICES = {
    "R-Esteem": {
        "RPS/01": "6.25x6x10",
        "RPS/02": "6.25x7x10",
        "RPS/03": "6x6.6x10",
    },
    "R-Infinty": {
        "RSI/01": "6.25x6x12",
        "RSI/02": "6.25x7x12",
        "RSI/03": "6x6.6x12",
    },
    "R-Elite": {
        "REL/0l": "6.25x3.5x8",
        "REL/02": "6.25x4.5x8",
        "REL/03": "6.25x6x8",
        "REL/04": "6.25x7x8",
        "REL/05": "6.25x4.5x10",
        "REL/06": "6.25x6x10",
        "REL/07": "6.25x7x10",
        "REL/08": "6.26x4.5x12",
        "REL/09": "6.25x6x12",
        "REL/10": "6.25x7x12",
    },
    "unknown": "Unknown",
}


class ProductCategory(MPTTModel):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)

    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.CASCADE
    )
    background_image = ResizedImageField(size=[1200, 630], upload_to='category-backgrounds/')
    background_image_alt = models.CharField(max_length=128, blank=True)

    objects = models.Manager()
    tree = TreeManager()

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ("pk",)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = models.TextField(max_length=250, null=True, blank=True)
    product_category = models.ForeignKey(
        ProductCategory,
        related_name="products",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    #size = models.CharField(max_length=250, choices=FEET_CHOICES, default="R-Esteem")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    rating = models.FloatField(null=True, blank=True)
    objects = models.Manager()

    class Meta:
        ordering = ("slug",)
        app_label = "products"
        permissions = (("Manage products.", "Can manage products"),)

    def __str__(self):
        return f"{self.name} of {self.rating}"


class ProductMedia(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="media",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    image =  ResizedImageField(size=[1200, 630], upload_to='product-images/')
    alt = models.CharField(max_length=128, blank=True)
    type = models.CharField(
        max_length=32,
        choices=ProductMediaTypes.CHOICES,
        default=ProductMediaTypes.IMAGE,
    )
    objects = models.Manager()

    class Meta:
        ordering = ("pk",)

    def __str__(self):
        return f"{self.alt} of {self.type}"


def validate_thumbnail_size(size: int):
    if size not in THUMBNAIL_SIZES:
        available_sizes = [str(size) for size in THUMBNAIL_SIZES]
        raise ValidationError(
            f"Only following sizes are available: {', '.join(available_sizes)}."
        )


class Thumbnail(models.Model):
    image = models.ImageField(upload_to="thumbnails")
    size = models.PositiveIntegerField(validators=[validate_thumbnail_size])
    format = models.CharField(
        max_length=32, null=True, blank=True, choices=ThumbnailFormat.CHOICES
    )
    product_category = models.ForeignKey(
        ProductCategory,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="thumbnails",
    )

    product_media = models.ForeignKey(
        ProductMedia,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="thumbnails",
    )

    class Meta:
        ordering = ("pk",)

    def __str__(self):
        return f"{self.format} of {self.size}"
