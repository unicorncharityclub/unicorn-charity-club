from django.db import models

# Create your models here.
class Myaccount(models.Model):
    Name = models.CharField(max_length=120)
    Address = models.TextField()
    Email = models.CharField(max_length=120, default='abc')
    Mobile = models.CharField(max_length=10)
    ProfilePic = models.ImageField(upload_to='profilePictures', blank=True)

    def __str__(self):
        return '{} {} {} {}'.format(self.Name, self.Address, self.Email, self.Mobile, self.ProfilePic)
