from django.db import models
from django.core.validators import RegexValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
from accounts.models import User


class Myaccount(models.Model):
    objects = None
    user = models.OneToOneField(
       settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
    )
    Address = models.TextField(blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{11}$',
                message="Phone number must be entered in the format: '+1xxxxxxxxxx'. Phone number should be 10 digits.")
    Mobile = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    ProfilePic = models.ImageField(upload_to='upload/image/profile_picture', blank=True)
    Aboutme = models.TextField(blank=True)
    FavoriteThing = models.TextField(blank=True)
    Dream = models.TextField(blank=True)
    SuperPowers = models.TextField(blank=True)
    Support = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return '{} {} {}'.format(self.Address,  self.Mobile, self.ProfilePic)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Myaccount.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.myaccount.save()


class ChildAccount(models.Model):
    objects = None
    school_grade_choices = (
        ('Kindergarten', 'Kindergarten'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
        ('Grade 6', 'Grade 6')
    )

    School = models.CharField(max_length=255,
                              blank=True)
    SchoolGrade = models.CharField(max_length=15,
                                   choices=school_grade_choices,
                                   default='Kindergarten',
                                    blank=True)
    ParentId = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='parent_id')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='user_id')

    def __str__(self):
        return self.user

    def get_school(self):
        return self.School

    def get_school_grade(self):
        return self.SchoolGrade


class ProjectInterest(models.Model):
    objects = None
    name = models.CharField(max_length=255)
    tags = models.CharField(max_length=255, blank=True)
    feature = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return '{} {} {}'.format(self.name,  self.tags, self.feature)