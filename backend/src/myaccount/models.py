from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Myaccount(models.Model):
    Name = models.CharField(max_length=120)
    Address = models.TextField()
    Email = models.CharField(max_length=120, default='abc')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{11}$',
                                 message="Phone number must be entered in the format: '+1xxxxxxxxxx'. Phone number should be 10 digits.")
    Mobile = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    ProfilePic = models.ImageField(upload_to='profilePictures', blank=True)

    def __str__(self):
        return '{} {} {} {}'.format(self.Name, self.Address, self.Email, self.Mobile, self.ProfilePic)
