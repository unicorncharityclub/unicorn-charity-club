from .views import charity_project_details, all_project_list, project_category, all_project_info_list, start_project, \
    update_project_invitation_video_details, update_project_prize, update_project_challenge_status_explore, \
    challenge_learn_new_skill, update_project_challenge_status_ideation, update_user_invitation,\
    get_friend_list, search_friends, get_active_project_details, unregistered_invitation,\
    fetch_project_planning_status, create_volunteer_adventure, challenge_develop_new_habit
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<int:project_id>', charity_project_details),
    path('', all_project_list),
    path('all_project_info_list', all_project_info_list),
    path('category', project_category),
    path('start', start_project),
    path('plannedProjects', fetch_project_planning_status),
    path('invitationVideo', update_project_invitation_video_details),
    path('projectPrize', update_project_prize),
    path('userInvitation', update_user_invitation),
    path('friendByEmail', get_friend_list),
    path('search', search_friends),
    path('update/Challenge1', update_project_challenge_status_explore),
    path('update/Challenge2', update_project_challenge_status_ideation),
    path('LearnNewSkill', challenge_learn_new_skill),
    path('volunteerTime', create_volunteer_adventure),
    path('activeProjectList/<str:user_emailid>/',get_active_project_details),
    path('unregisteredInvitation', unregistered_invitation),
    path('DevelopNewHabit', challenge_develop_new_habit)
]