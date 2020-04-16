from .views import all_project_list, update_project_challenge_status_explore, \
    update_project_challenge_status_ideation, update_user_invitation,\
    get_friend_list, search_friends, unregistered_invitation,\
    fetch_project_invitation_details, join_project_invitation, spread_the_word,\
    fetch_completed_projects, spotlight_stats, unlock_prize

from django.urls import path
from charityprojects.api import views


urlpatterns = [

    # General Methods and Project Details
    path('<int:pk>/', views.CharityProjectDetailsView.as_view()),
    path('', all_project_list),
    path('all_projects/', views.CharityProjectListView.as_view()),
    path('category/', views.CharityProjectCategory.as_view()),
    path('socialImpact/<str:user_email>/', spotlight_stats),

    # Start Project related
    path('start/', views.CharityProjectStartProject.as_view()),
    path('start_project/', views.StartProject.as_view()),
    path('friendByEmail', get_friend_list),
    path('search', search_friends),
    path('unregisteredInvitation', unregistered_invitation),

    # Charity Project List
    path('active_project_list/', views.ActiveProjectListView.as_view()),
    path('planning_project_list/', views.PlannedProjectListView.as_view()),
    path('completedProjects/<str:user_email>/', fetch_completed_projects),

    # Invitations
    path('invitation/Details/', fetch_project_invitation_details),
    path('joinProject', join_project_invitation),
    path('userInvitation', update_user_invitation),
    path('project_invitation/', views.ProjectInvitationsListView.as_view()),

    # Project Challenges
    path('update/Challenge1', update_project_challenge_status_explore),
    path('update/Challenge2', update_project_challenge_status_ideation),
    path('learn_new_skill/', views.ChallengeLearNewSkillView.as_view()),
    path('volunteer_time/', views.ChallengeVolunteerTimeDetailsView.as_view()),
    path('spreadWord', spread_the_word),

    path('give_donation/', views.ChallengeGiveDonationDetailsView.as_view()),
    path('fundraiser/', views.ChallengeFundraiserDetailsView.as_view()),
    path('develop_new_habit/', views.ChallengeDevelopNewHabitDetailsView.as_view()),

    path('Congratulations/<int:project_id>/<str:user_email>/', unlock_prize),
]
