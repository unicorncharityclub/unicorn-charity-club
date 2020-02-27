from django.contrib import admin

from .models import ChildAccount
from .forms import ChildAccountForm

#admin.site.register(ChildAccount)


class ChildAccountAdmin(admin.ModelAdmin):
    form = ChildAccountForm


admin.site.register(ChildAccount, ChildAccountAdmin)
