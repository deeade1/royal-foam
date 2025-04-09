from django.db import models


class ContactUs(models.Model):
    full_name = models.CharField(max_length=225)
    email = models.EmailField()
    subject = models.CharField(max_length=225)
    message = models.TextField()
    agree = models.BooleanField()

    class Meta:
        verbose_name = "Contact Us"
        verbose_name_plural = " Contact Us"

    def __str__(self):
        return self.email


class Subscribe(models.Model):
    email = models.EmailField()

    class Meta:
        verbose_name = "Subscribe"
        verbose_name_plural = "Subscribe"

    def __str__(self):
        return self.email
