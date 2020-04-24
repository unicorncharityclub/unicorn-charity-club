from django.contrib import admin
from django import forms
from misc import models
from ckeditor.widgets import CKEditorWidget

# Register your models here.
from .models import Page


class PageAdminForm(forms.ModelForm):
    class Meta:
        model = Page
        widgets = {
            'content': CKEditorWidget,
        }
        fields = '__all__'


class PageAdmin(admin.ModelAdmin):
    form = PageAdminForm


admin.site.register(Page, PageAdmin)
