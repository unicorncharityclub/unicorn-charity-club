from django.db import models
from django.core.validators import RegexValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
from accounts.models import User


class Profile(models.Model):
    objects = None
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    address = models.TextField(blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{11}$',
                message="Phone number must be entered in the format: '+1xxxxxxxxxx'. Phone number should be 10 digits.")
    mobile = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    profile_pic = models.ImageField(upload_to='upload/image/profile_picture', blank=True)
    cover_pic = models.ImageField(upload_to='upload/image/cover_pic', blank=True)
    about_me = models.TextField(blank=True)
    favorite_thing = models.TextField(blank=True)
    dream = models.TextField(blank=True)
    super_powers = models.TextField(blank=True)
    support = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return '{} {} {}'.format(self.address,  self.mobile, self.profile_pic)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class ChildProfile(models.Model):
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

    school = models.CharField(max_length=255,
                              blank=True)
    school_grade = models.CharField(max_length=15,
                                    choices=school_grade_choices,
                                    default='Kindergarten',
                                    blank=True)
    parent = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='parent')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='child')

    def __str__(self):
        return self.user

    def get_school(self):
        return self.school

    def get_school_grade(self):
        return self.school_grade


class ProjectInterest(models.Model):
    objects = None
    name = models.CharField(max_length=255)
    tags = models.CharField(max_length=255, blank=True)
    feature = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return '{} {} {}'.format(self.name,  self.tags, self.feature)

    def get_name(self):
        return self.name

    def get_tags(self):
        return self.tags

    def get_feature(self):
        return self.feature


class UserProjectInterest(models.Model):
    objects = None
    user = models.ManyToManyField(User)
    project_interest = models.ManyToManyField(ProjectInterest)

    def __str__(self):
        return '{} {}'.format(self.user,  self.project_interest)

    def get_user(self):
        return self.user

    def get_project_interest(self):
        return self.project_interest
