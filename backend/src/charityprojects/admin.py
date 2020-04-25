from django.contrib import admin
from .models import CharityProjects, VolunteerTime, GiveDonation, SpreadWord, LearnNewSkill, Fundraise

# Register your models here.

admin.site.register(CharityProjects)
admin.site.register(VolunteerTime)
admin.site.register(GiveDonation)
admin.site.register(SpreadWord)
admin.site.register(LearnNewSkill)
admin.site.register(Fundraise)