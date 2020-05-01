from django.test import RequestFactory, TestCase
from rest_framework.test import force_authenticate
from .api.views import CharityProjectCategory, CharityProjectListView, CharityProjectDetailsView,\
    CharityProjectStartProject, ChallengeVolunteerTimeDetailsView, ChallengeLearNewSkillView,\
    ChallengeDevelopNewHabitDetailsView, ChallengeFundraiserDetailsView, ChallengeGiveDonationDetailsView
from apps.accounts.models import User
from .models import CharityProjects, ProjectUser, VolunteerTime, LearnNewSkill, DevelopNewHabit, Fundraise, GiveDonation


# Create your tests here.
class CharityProjectTest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        # Initial db set up for charity projects. Tests use a separate db
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            email='testuser@gmail.com', password='123456')
        CharityProjects.objects.create(name='TestProject', goal='ProjectGoal', mission='ProjectMission',
                                       category='ProjectCategory', tags='ProjectTag')
        CharityProjects.objects.create(name='TestProject2', goal='ProjectGoal2', mission='ProjectMission2',
                                       category='ProjectCategory2', tags='ProjectTag2')
        ProjectUser.objects.create(project_id=1, user_id=1)
        ProjectUser.objects.create(project_id=2, user_id=1)
        VolunteerTime.objects.create(project_user_id=2, organisation_name='TestOrganisation')
        LearnNewSkill.objects.create(project_user_id=2, new_skill="TestSkill", description="SkillDescription")
        DevelopNewHabit.objects.create(project_user_id=2, new_habit='TestHabit', description='TestDescription')
        GiveDonation.objects.create(project_user_id=2, organisation_name='TestOrganisation',
                                    organisation_city='TestCity', organisation_state='TestState',
                                    donation_details='TestDonation')
        Fundraise.objects.create(project_user_id=2, organisation_name='TestOrganisation', organisation_city='TestCity',
                                 organisation_state='TestState', fundraise_details='TestFundraiser',
                                 fundraise_amount='100')

    def test_category(self):
        request = self.factory.get('category/')

        request.user = self.user

        response = CharityProjectCategory.as_view()(request, *[], **{})
        print(response.data)
        self.assertEqual(response.status_code, 200)

    def test_charity_project_list_view(self):
        request = self.factory.get('all_projects/')

        request.user = self.user

        response = CharityProjectListView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    #def test_charity_project_details_view(self):
        #request = self.factory.get('', kwargs={'pk':1})

        #request.user = self.user

        #response = CharityProjectDetailsView.as_view()(request)
        #self.assertEqual(response.status_code, 200)

    def test_start_charity_project(self):
        request = self.factory.post('start/', {'user_id': 1, 'project_id': 2})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = CharityProjectStartProject.as_view()(request, *[], **{})
        print(response.data)
        self.assertEqual(response.status_code, 200)

    def test_volunteer_time_adventure(self):
        request = self.factory.get('volunteer_time/', {'project_id': 2})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeVolunteerTimeDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)

    def test_learn_new_skill_adventure(self):
        request = self.factory.get('learn_new_skill/', {'project_id': 2})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeLearNewSkillView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)

    def test_develop_new_habit_adventure(self):
        request = self.factory.get('develop_new_habit/', {'project_id': 2})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeDevelopNewHabitDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)

    def test_fundraiser_adventure(self):
        request = self.factory.get('fundraiser/', {'project_id': 2})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeFundraiserDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)

    def test_give_donation_adventure(self):
        request = self.factory.get('give_donation/', {'project_id': 2})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeGiveDonationDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)

    def test_update_volunteer_time_adventure(self):
        request = self.factory.put('volunteer_time/', {'project_id': 2, 'volunteer_hours': 20}, content_type='application/json')
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeVolunteerTimeDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['volunteer_hours'], 20)

    def test_update_develop_new_habit_adventure(self):
        self.new_habit = 'UpdateHabit'
        request = self.factory.put('develop_new_habit/', {'project_id': 2, 'new_habit': self.new_habit}, content_type='application/json')
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeDevelopNewHabitDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['new_habit'], self.new_habit)

    def test_update_give_donation_adventure(self):
        self.address = 'California'
        request = self.factory.put('give_donation/', {'project_id': 2, 'organisation_address': self.address},
                                   content_type='application/json')
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeGiveDonationDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['organisation_address'], self.address)

    def test_update_fundraiser_adventure(self):
        self.address = 'California'
        request = self.factory.put('fundraiser/', {'project_id': 2, 'organisation_address': self.address},
                                   content_type='application/json')
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeFundraiserDetailsView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['organisation_address'], self.address)

    def test_update_learn_new_skill_adventure(self):
        self.new_skill = 'UpdateSkill'
        request = self.factory.put('learn_new_skill/', {'project_id': 2, 'new_habit': self.new_habit},
                                   content_type='application/json')
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = ChallengeLearNewSkillView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['new_skill'], self.new_skill)

















