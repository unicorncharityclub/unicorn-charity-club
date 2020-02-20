from django.db import models

# Create your models here.


class CharityProjects(models.Model):
    Name = models.CharField(max_length=100)
    Goal = models.TextField(default="")
    Mission = models.TextField(default="")
    Category = models.CharField(max_length=50)
    Video_Name = models.CharField(max_length=30)
    Video = models.FileField(upload_to='projectVideo/')
    Badge = models.ImageField(upload_to='projectBadge/')
    Tags = models.TextField(default="")
    Banner = models.ImageField(upload_to='projectBanner/')

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





