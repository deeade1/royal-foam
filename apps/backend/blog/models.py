from django.conf import settings
from django.db import models
from django.utils.timezone import now

# Category model
class Category(models.Model):
    name = models.CharField(max_length=200, null=True)
    slug = models.SlugField(null=True)
    description = models.TextField(
        max_length=500, null=True, blank=True, verbose_name="Description"
    )

    class Meta:
        ordering = ["pk"]
        verbose_name_plural = "Category"

    def __str__(self):
        return str(self.name)


# Tag model
class Tag(models.Model):
    name = models.CharField(max_length=100, null=True)

    class Meta:
        ordering = ["pk"]

    def __str__(self):
        return self.name




class PostManager(models.Manager):
    def get_queryset(self):
        """Ensure all queries use the base queryset."""
        return super().get_queryset()

    def published(self):
        """Returns only published posts with a valid publish_date."""
        return self.get_queryset().filter(published=True, publish_date__lte=now())


class Post(models.Model):
    title = models.CharField(max_length=255, unique=True)
    subtitle = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    body = models.TextField()
    meta_description = models.CharField(max_length=150, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    publish_date = models.DateTimeField(blank=True, null=True)
    published = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, blank=True, null=True, related_name="posts"
    )
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag, blank=True)
    media = models.FileField(upload_to="blog-media", blank=True, null=True)

    objects = PostManager()  # ✅ Assign the custom manager

    class Meta:
        ordering = ["-publish_date"]

    def __str__(self):
        return f"{self.title} | {self.author.first_name}"


# Comment model
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=100, null=True, blank=False)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.post.title} | {self.name}"


# Reply model
class Reply(models.Model):
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="replies"
    )
    name = models.CharField(max_length=200, null=True, blank=False)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.comment} | {self.name} | {self.created_at}"



# Post model
class Testimonial(models.Model):
    title = models.CharField(max_length=255, unique=True)
    body = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    media = models.FileField(upload_to="blog-media", blank=True, null=True)

    class Meta:
        ordering = ["-date_created"]

    def __str__(self):
        return f"{self.title} | {self.author.first_name}"