from django.db import models

# Create your models here.
class Prize(models.Model):
    Category = models.CharField(max_length=120)
    Tags = models.CharField(max_length=120)
    ImageName = models.CharField(max_length=120)
    Image = models.ImageField(upload_to='upload', blank=True)

    def __str__(self):
        return '{} {} {} {}'.format(self.Category,  self.Tags, self.ImageName, self.Image)
