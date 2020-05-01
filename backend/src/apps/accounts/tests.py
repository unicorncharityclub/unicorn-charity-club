from django.contrib.auth.hashers import make_password
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.accounts.api.views import UserRegistrationView, AddChildView
from apps.accounts.models import User


# Create your tests here.
from apps.profile.models import ChildProfile, Profile


class AccountsTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=False)
        self.user = User.objects.create(email='testuser@gmail.com', password=make_password('123456'),
                                        first_name='lorum', last_name='ipsum', gender='Male', dob='2008-03-26')

    def helper_authenticate_user(self, request):
        request.user = self.user
        force_authenticate(request, user=self.user)

    def test_register_new_user(self):
        """
        The test method is used to test the registration of a new user to the application.
        :return:
        """
        request = self.factory.post('register/',
                                    {'email': 'testuser2@gmail.com',
                                     'password': '123456',
                                     'first_name': 'lorem',
                                     'last_name': 'ipsum',
                                     'dob': '2018-02-02'}
                                    )
        request.session = None
        response = UserRegistrationView.as_view()(request, *[], **{})
        self.assertEqual(response.data['status'], 'Success')

    def test_register_existing_user(self):
        """
        The test method is used to test the registration of an existing user to the application.
        :return:
        """
        request = self.factory.post('register/',
                                    {'email': 'testuser@gmail.com',
                                     'password': '123456',
                                     'first_name': 'lorem',
                                     'last_name': 'ipsum',
                                     'dob': '2018-02-02'}
                                    )
        request.session = None
        response = UserRegistrationView.as_view()(request, *[], **{})
        self.assertEqual(response.data['status'], 'User Already Exist')

    def test_child(self):
        """
        This method is used to test the addition of a new child account for a parent.
        :return:
        """
        request = self.factory.post('addchild/', {'first_name': 'child_fname',
                                                  'last_name': 'lorum',
                                                  'dob': '2016-03-24',
                                                  'address': 'address_child',
                                                  'about_me': 'child about details',
                                                  'dream': 'child dreams',
                                                  'school': 'ASU school',
                                                  'school_grade': 'Grade 1'})
        self.helper_authenticate_user(request)
        response = AddChildView.as_view()(request, *[], **{})
        self.assertEqual(response.status_code, 200)

        # Get child details
        child_object = ChildProfile.objects.filter(parent=self.user)[0]
        self.assertEqual(child_object.school, 'ASU school')