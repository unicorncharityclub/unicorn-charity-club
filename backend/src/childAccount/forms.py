from django import forms
from .models import ChildAccount


class ChildAccountForm(forms.ModelForm):
    SUPPORT_CHOICES = [
        (1, 'Animals'),
        (2, 'Arts, Culture, Humanities'),
        (3, 'Community Development'),
        (4, 'Education'),
        (5, 'Environment'),
        (6, 'Health and Wellness'),
        (7, 'Human and Civil Rights'),
        (8, 'International Causes'),
        (9, 'Research and Public Policy')
    ]
    Support = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple,
                                        choices=SUPPORT_CHOICES,
                                        required=False)

    class Meta:
        model = ChildAccount
        fields = ['Name', 'Gender', 'School', 'SchoolGrade', 'Aboutme', 'FavoriteThing', 'Dream',
                  'SuperPowers', 'Support', 'Photo', 'UserId']


