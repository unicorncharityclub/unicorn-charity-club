from django.db import models

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        user = self.model(
            email=email,

        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_active = True
        user.superuser = True
        user.save()
        return user


class User(AbstractBaseUser):
    gender_choices = [
        ('Male', 'M'),
        ('Female', 'F')

    ]
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    gender = models.CharField(max_length=6, choices=gender_choices, default="")
    dob = models.DateField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    #REQUIRED_FIELDS = ['dob']  # Email & Password are required by default.

    objects = UserManager()

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # Simplest possible answer: Yes, always
        return True



    @property
    def is_admin(self):
        return self.admin

