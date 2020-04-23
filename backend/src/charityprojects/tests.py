from django.test import RequestFactory, TestCase
from rest_framework.test import force_authenticate
from .api.views import CharityProjectCategory, CharityProjectListView, CharityProjectDetailsView, CharityProjectStartProject
from accounts.models import User
from .models import CharityProjects
from django.contrib.auth.models import AnonymousUser


# Create your tests here.
class CharityProjectCategoryTest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            email='testuser@gmail.com', password='123456')
        CharityProjects.objects.create(name='TestProject', goal='ProjectGoal', mission='ProjectMission',
                                       category='ProjectCategory', tags='ProjectTag')

    def test_category(self):
        # Create an instance of a GET request.
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

    def test_charity_project_details_view(self):
        request = self.factory.get('', kwargs={'pk':1})

        request.user = self.user

        response = CharityProjectDetailsView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_start_charity_project(self):
        request = self.factory.post('start/', {'user_id': 1, 'project_id': 1})
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = CharityProjectStartProject.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)







