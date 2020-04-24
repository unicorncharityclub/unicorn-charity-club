from django.db import models


# Create your models here.
class Page(models.Model):
    objects = None
    title = models.CharField(max_length=100)
    content = models.TextField()
    slug = models.SlugField(unique=True, help_text="Please do not change this value for pages listed in footer, "
                                                   "such as Privacy Policy, Terms & Conditions, etc.")

    def __str__(self):
        return self.slug
