from .views import charity_project_details, all_project_list, project_category, all_project_info_list, start_project, update_project_invitation_video_details, update_project_prize, update_project_challenge_status_explore
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<int:project_id>', charity_project_details),
    path('', all_project_list),
    path('all_project_info_list', all_project_info_list),
    path('category', project_category),
    path('start', start_project),
    path('invitationVideo', update_project_invitation_video_details),
    path('projectPrize', update_project_prize),
    path('update/Challenge1', update_project_challenge_status_explore)


]