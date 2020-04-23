from .views import all_project_list, \
    spread_the_word, spotlight_stats, unlock_prize, user_feed

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

    path('search_friend_email/', views.SearchFriendByEmailView.as_view()),
    path('search_friend_name/', views.SearchFriendByNameView.as_view()),
    #path('unregisteredInvitation', unregistered_invitation),  # friends

    # Charity Project List
    path('active_project_list/', views.ActiveProjectListView.as_view()),
    path('planning_project_list/', views.PlannedProjectListView.as_view()),
    path('completed_project_list/', views.CompletedProjectListView.as_view()),

    # Invitations
    path('project_invitation_details/', views.ProjectInvitationsView.as_view()),
    #path('userInvitation', update_user_invitation),  # friends
    path('invite_user/', views.InviteUser.as_view()),
    path('project_invitation/', views.ProjectInvitationsListView.as_view()),

    # Project Challenges
    path('update/Challenge/', views.CharityProjectStartProject.as_view()),
    path('learn_new_skill/', views.ChallengeLearNewSkillView.as_view()),
    path('volunteer_time/', views.ChallengeVolunteerTimeDetailsView.as_view()),
    path('spreadWord', spread_the_word),  # friends

    path('give_donation/', views.ChallengeGiveDonationDetailsView.as_view()),
    path('fundraiser/', views.ChallengeFundraiserDetailsView.as_view()),
    path('develop_new_habit/', views.ChallengeDevelopNewHabitDetailsView.as_view()),

    path('Congratulations/<int:project_id>/<str:user_email>/', unlock_prize),

    path('feed', user_feed)
]
