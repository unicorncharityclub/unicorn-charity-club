from django.db import models


# Create your models here.
class Prize(models.Model):
    objects = None
    category = models.CharField(max_length=120)
    tags = models.CharField(max_length=120)
    name = models.CharField(max_length=120)
    image = models.ImageField(upload_to='upload/image/prize_images')

    def __str__(self):
        return '{} {} {} {}'.format(self.category,  self.tags, self.name, self.image)

