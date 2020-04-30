from django.test import RequestFactory, TestCase
from rest_framework.test import force_authenticate
from rest_framework.test import APIClient

from apps.accounts.api.views import UserRegistrationView
from apps.accounts.models import User
from django.test import TestCase


# Create your tests here.
class AccountsTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(email='testuser@gmail.com', password='123456')

    def test_register_new_user(self):
        request = self.factory.post('register/',
                                    {'email': 'testuser2@gmail.com',
                                     'password': '123456',
                                     'first_name': 'lorem',
                                     'last_name': 'ipsum',
                                     'dob': '2018-02-02',
                                     'gender': 'Male',
                                     'mobile': '+18523697410'}
                                    )
        request.session = None
        response = UserRegistrationView.as_view()(request, *[], **{})
        self.assertEqual(response.data['status'], 'Success')

    def test_register_existing_user(self):
        request = self.factory.post('register/',
                                    {'email': 'testuser@gmail.com',
                                     'password': '123456',
                                     'first_name': 'lorem',
                                     'last_name': 'ipsum',
                                     'dob': '2018-02-02',
                                     'gender': 'Male',
                                     'mobile': '+18523697410'}
                                    )
        request.session = None
        response = UserRegistrationView.as_view()(request, *[], **{})
        self.assertEqual(response.data['status'], 'User Already Exist')