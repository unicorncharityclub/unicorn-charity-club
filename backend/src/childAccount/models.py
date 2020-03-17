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

    School = models.CharField(max_length=255,
                              blank=True)
    SchoolGrade = models.CharField(max_length=15,
                                   choices=school_grade_choices,
                                   default='Kindergarten')
    UserId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.UserId

    def get_school(self):
        return self.School

    def get_school_grade(self):
        return self.SchoolGrade
