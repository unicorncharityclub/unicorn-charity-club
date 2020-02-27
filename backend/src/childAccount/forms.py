from django import forms
from .models import ChildAccount


class ChildAccountForm(forms.ModelForm):
    SUPPORT_CHOICES =[
        ('Animals', 'Animals'),
        ('Arts, Culture, Humanities', 'Arts, Culture, Humanities'),
        ('Community Development', 'Community Development'),
        ('Education', 'Education'),
        ('Environment', 'Environment'),
        ('Health and Wellness', 'Health and Wellness'),
        ('Human and Civil Rights', 'Human and Civil Rights'),
        ('International Causes', 'International Causes'),
        ('Research and Public Policy', 'Research and Public Policy')
    ]
    Support = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple,
                                        choices=SUPPORT_CHOICES,
                                        required=False)

    class meta:
        model = ChildAccount
        fields = ['Name', 'Gender', 'School', 'SchoolGrade', 'Aboutme', 'FavoriteThing', 'Dream', 'Support', 'Photo']

