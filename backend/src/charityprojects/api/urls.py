from .views import charity_project_details, all_project_list, project_category, all_project_info_list, start_project, \
    update_project_invitation_video_details, update_project_prize, update_project_challenge_status_explore, \
    challenge_learn_new_skill, update_project_challenge_status_ideation, update_user_invitation,\
    get_friend_list, search_friends, get_active_project_details, unregistered_invitation,\
    fetch_project_planning_status, volunteer_time, challenge_develop_new_habit, get_project_invitations,\
    fetch_project_invitation_details, join_project_invitation, spread_the_word, donation, fetch_completed_projects, \
    get_challenge_learn_new_skill, spotlight_stats, fundraiser

from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<int:project_id>', charity_project_details),
    path('', all_project_list),
    path('all_project_info_list', all_project_info_list),
    path('category', project_category),
    path('start', start_project),
    path('plannedProjects/<str:user_email>/', fetch_project_planning_status),
    path('invitationVideo', update_project_invitation_video_details),
    path('projectPrize', update_project_prize),
    path('userInvitation', update_user_invitation),
    path('friendByEmail', get_friend_list),
    path('search', search_friends),
    path('update/Challenge1', update_project_challenge_status_explore),
    path('update/Challenge2', update_project_challenge_status_ideation),
    path('LearnNewSkill', challenge_learn_new_skill),
    path('volunteerTime', volunteer_time),
    path('spreadWord', spread_the_word),
    path('giveDonation', donation),
    path('fundraiser', fundraiser),
    path('completedProjects/<str:user_email>/', fetch_completed_projects),
    path('socialImpact/<str:user_email>/', spotlight_stats),
    path('activeProjectList/<str:user_email>/', get_active_project_details),
    path('invitations/<str:user_email>/', get_project_invitations),
    path('invitation/Details/', fetch_project_invitation_details),
    path('joinProject', join_project_invitation),
    path('unregisteredInvitation', unregistered_invitation),
    path('DevelopNewHabit', challenge_develop_new_habit),
    path('LearnNewSkill/<int:project_id>/<str:user_email>/', get_challenge_learn_new_skill),
]
