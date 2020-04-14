from .views import all_project_list, update_project_challenge_status_explore, \
    update_project_challenge_status_ideation, update_user_invitation,\
    get_friend_list, search_friends, get_active_project_details, unregistered_invitation,\
    fetch_project_planning_status, volunteer_time, challenge_develop_new_habit, get_project_invitations,\
    fetch_project_invitation_details, join_project_invitation, spread_the_word, donation, fetch_completed_projects, \
    spotlight_stats, fundraiser, unlock_prize

from rest_framework.routers import DefaultRouter
from django.urls import path
from charityprojects.api import views


urlpatterns = [

    # General Methods and Project Details
    path('<int:pk>/', views.CharityProjectDetailsView.as_view()),
    path('', all_project_list),
    path('all_projects/', views.CharityProjectListView.as_view()),
    path('category/', views.CharityProjectCategory.as_view()),

    # Start Project related
    path('start/', views.CharityProjectStartProject.as_view()),
    path('start_project/', views.StartProject.as_view()),

    path('active_project_list/', views.ActiveProjectListView.as_view()),
    #path('activeProjectList/<str:user_email>/', get_active_project_details),

    # Project Challenges
    path('LearnNewSkill/', views.ChallengeLearNewSkillView.as_view()),

    path('plannedProjects/<str:user_email>/', fetch_project_planning_status),
    path('userInvitation', update_user_invitation),
    path('friendByEmail', get_friend_list),
    path('search', search_friends),
    path('update/Challenge1', update_project_challenge_status_explore),
    path('update/Challenge2', update_project_challenge_status_ideation),
    path('volunteerTime', volunteer_time),
    path('spreadWord', spread_the_word),
    path('giveDonation', donation),
    path('fundraiser', fundraiser),
    path('completedProjects/<str:user_email>/', fetch_completed_projects),
    path('socialImpact/<str:user_email>/', spotlight_stats),

    path('invitations/<str:user_email>/', get_project_invitations),
    path('invitation/Details/', fetch_project_invitation_details),
    path('joinProject', join_project_invitation),
    path('unregisteredInvitation', unregistered_invitation),
    path('DevelopNewHabit', challenge_develop_new_habit),
    path('Congratulations/<int:project_id>/<str:user_email>/', unlock_prize),


]
