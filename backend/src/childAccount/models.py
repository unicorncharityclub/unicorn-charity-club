from django.db import models
from datetime import datetime

# from ..myaccount.models import Myaccount


def today_utc():
    return datetime.utcnow().date()


class ChildAccount(models.Model):
    school_grade_choices = (
        ('Kindergarten', 'Kindergarten'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
        ('Grade 6', 'Grade 6')
    )
    Name = models.CharField(max_length=100)
    DOB = models.DateField(default=today_utc)
    School = models.CharField(max_length=255,
                              blank=True)
    SchoolGrade = models.CharField(max_length=15,
                                   choices=school_grade_choices,
                                   default='Kindergarten')
    UnicornName = models.CharField(max_length=100,
                                   blank=True)
    UnicornPowers = models.TextField(blank=True)
    ImpactEmblem = models.ImageField(blank=True)
    Photo = models.ImageField(blank=True)
    # ParentId = models.ForeignKey(Myaccount, on_delete=models.CASCADE)

    def __str__(self):
        return self.Name

    def get_date_of_birth(self):
        return self.DOB

    def get_school(self):
        return self.School

    def get_school_grade(self):
        return self.get_school_grade()

    def get_unicorn_name(self):
        return self.UnicornName

    def get_unicorn_powers(self):
        return self.UnicornPowers

    def get_impact_emblem(self):
        return self.ImpactEmblem

    def get_photo(self):
        return self.Photo



