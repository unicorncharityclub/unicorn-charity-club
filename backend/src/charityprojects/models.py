from django.db import models
from accounts.models import User
# Create your models here.


class CharityProjects(models.Model):
    objects = None
    Name = models.CharField(max_length=100)
    Goal = models.TextField(default="")
    Mission = models.TextField(default="")
    Category = models.CharField(max_length=50)
    Video_Name = models.CharField(max_length=30, blank=True, null= True)
    Video = models.FileField(upload_to='projectVideo/', blank=True, null=True)
    Badge = models.ImageField(upload_to='projectBadge/', blank=True, null=True)
    Tags = models.TextField(default="")
    Banner = models.ImageField(upload_to='projectBanner/', blank=True, null=True)

    def __str__(self):
        return self.Name

    def get_project_name(self):
        return self.Name

    def get_project_video(self):
        return self.Video

    def get_project_goal(self):
        return self.Goal

    def get_project_badge(self):
        return self.Badge

    def get_project_banner(self):
        return self.Banner


class ProjectUser(models.Model):
    project_id = models.ForeignKey(CharityProjects, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    invited_by = models.EmailField(null=True, blank=True)

    def __str__(self):
        return '{} {} {}'.format(self.project_id, self.user_id, self.invited_by)

    def fetch_invited_by(self, inviter_id):
        user_email = User.objects.get(pk=inviter_id)
        return user_email





