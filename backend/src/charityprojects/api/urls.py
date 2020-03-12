from .views import charity_project_details, all_project_list, project_category, all_project_info_list, start_project, \
    update_project_invitation_video_details, update_project_prize, update_project_challenge_status_explore, \
    challenge_learn_new_skill, update_project_challenge_status_ideation, update_user_invitation,\
    get_friend_list, search_friends
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
    path('userInvitation', update_user_invitation),
    path('children', get_friend_list),
    path('search', search_friends),
    path('update/Challenge1', update_project_challenge_status_explore),
    path('update/Challenge2', update_project_challenge_status_ideation),
    path('learn_new_skill', challenge_learn_new_skill)

]