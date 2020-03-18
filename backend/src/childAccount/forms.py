from django import forms
from .models import ChildAccount


class ChildAccountForm(forms.ModelForm):

    class Meta:
        model = ChildAccount
        fields = ['Name', 'DOB', 'Gender', 'School', 'SchoolGrade', 'Aboutme', 'FavoriteThing', 'Dream',
                  'SuperPowers', 'Support', 'Photo', 'UserId']


