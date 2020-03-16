from django.db import models
from datetime import datetime

from accounts.models import User


def today_utc():
    return datetime.utcnow().date()


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

    gender_choices = (
        ('Male', 'Boy'),
        ('Female', 'Girl')
    )

    Name = models.CharField(max_length=100)
    DOB = models.DateField(default=today_utc)
    Gender = models.CharField(max_length=6,
                              choices=gender_choices, blank=True,
                              null=True)
    School = models.CharField(max_length=255,
                              blank=True)
    SchoolGrade = models.CharField(max_length=15,
                                   choices=school_grade_choices,
                                   default='Kindergarten')
    Aboutme = models.TextField(blank=True)
    FavoriteThing = models.TextField(blank=True)
    Dream = models.TextField(blank=True)
    SuperPowers = models.TextField(blank=True)
    Support = models.CharField(max_length=255, blank=True)
    Photo = models.ImageField(blank=True, upload_to='upload/image/profile_picture_child')
    UserId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('Name', 'DOB',)

    def __str__(self):
        return self.Name

    def get_date_of_birth(self):
        return self.DOB

    def get_school(self):
        return self.School

    def get_school_grade(self):
        return self.SchoolGrade

    def get_aboutme(self):
        return self.Aboutme

    def get_favorite_thing(self):
        return self.FavoriteThing

    def get_dream(self):
        return self.Dream

    def get_super_powers(self):
        return self.SuperPowers

    def get_support(self):
        return self.Support

    def get_photo(self):
        return self.Photo



