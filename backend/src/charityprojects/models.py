from django.db import models
from accounts.models import User
# Create your models here.
from prize.models import Prize


class CharityProjects(models.Model):
    objects = None
    Name = models.CharField(max_length=100)
    Goal = models.TextField(default="")
    Mission = models.TextField(default="")
    Category = models.CharField(max_length=50)
    Video_Name = models.CharField(max_length=30, null=True)
    Video = models.FileField(upload_to='upload/video/project_video/', null=True)
    Badge = models.ImageField(upload_to='upload/image/project_badge/', null=True)
    Tags = models.TextField(default="")
    Banner = models.ImageField(upload_to='upload/image/project_banner/', null=True)

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
    objects = None
    project_id = models.ForeignKey(CharityProjects, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    invited_by = models.EmailField(null=True, blank=True)
    date_joined = models.DateField(null=True, blank=True)
    date_started = models.DateField(null=True, blank=True) # should not be null will update when start project method is fixed
    goal_date = models.DateField(null=True, blank=True)
    challenge_status = models.CharField(max_length=100, blank=True)
    project_status = models.CharField(max_length=100, blank=True)
    adventure_id = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return '{} {} {}'.format(self.project_id, self.user_id, self.invited_by)

    def fetch_invited_by(self, inviter_id):
        user_email = User.objects.get(pk=inviter_id)
        return user_email


class ProjectUserDetails(models.Model):
    objects = None
    pu_id = models.ForeignKey(ProjectUser, on_delete=models.CASCADE, null=True)
    prize_given_id = models.ForeignKey(Prize, on_delete=models.CASCADE, null=True)
    video = models.FileField(upload_to='upload/video/invitation_video', null=True)

    def __str__(self):
        return '{} {} {} '.format(self.pu_id,  self.prize_given_id, self.video)


class LearnNewSkill(models.Model):
    newSkill = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    video = models.FileField(upload_to='upload/video/challenge_video', null=True)
    pu_id = models.ForeignKey(ProjectUser, on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('newSkill', 'pu_id')

    def __str__(self):
        return '{} {} {} {}'.format(self.newSkill, self.description, self.video, self.pu_id)


class UserInvitation(models.Model):
    objects = None
    pu_id = models.ForeignKey(ProjectUser, on_delete=models.CASCADE)
    friend_id = models.IntegerField(blank=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    prize_given_id = models.ForeignKey(Prize, on_delete=models.CASCADE, null=True)
    invitation_message = models.TextField(blank=True)
    invitation_date = models.DateField(null=True, blank=True) #should not be empty

    def __str__(self):
        return '{} {} {} {} {} {}'.format(self.pu_id, self.friend_id, self.status, self.prize_given_id,
                                          self.invitation_message, self.invitation_date)


class UnregisterInvitation(models.Model):
    objects = None
    pu_id = models.ForeignKey(ProjectUser, on_delete=models.CASCADE, null=True)
    unregister_user_emailId = models.CharField(max_length=100, null=True)
    prize_given_id = models.ForeignKey(Prize, on_delete=models.CASCADE, null=True)
    invitation_message = models.TextField(blank=True)

    def __str__(self):
        return '{} {} {} {}'.format(self.pu_id, self.unregister_user_emailId, self.prize_given_id, self.invitation_message)


class VolunteerTime(models.Model):
    objects = None
    pu_id = models.ForeignKey(ProjectUser, on_delete=models.CASCADE, null=True)
    organisation_name = models.CharField(max_length=100, blank=True)
    organisation_address = models.CharField(max_length=100, blank=True)
    organisation_city = models.CharField(max_length=50, blank=True)
    organisation_state = models.CharField(max_length=50, blank=True)
    volunteer_hours = models.IntegerField(blank=True)
    volunteer_work_description = models.TextField(blank=True)
    volunteer_exp = models.FileField(upload_to='upload/video/volunteer_exp', null=True)

    def __str__(self):
        return '{} {} {} {} {} {} {} {}'.format(self.pu_id, self.organisation_name, self.organisation_address,
                                                self.organisation_city, self.organisation_state, self.volunteer_hours,
                                                self.volunteer_work_description, self.volunteer_exp)


class DevelopNewHabit(models.Model):
    newHabit = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    video = models.FileField(upload_to='upload/video/challenge_video', null=True)
    pu_id = models.ForeignKey(ProjectUser, on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('newHabit', 'pu_id')

    def __str__(self):
        return '{} {} {} {}'.format(self.newHabit, self.description, self.video, self.pu_id)
