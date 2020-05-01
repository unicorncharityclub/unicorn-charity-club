from django.contrib.auth.hashers import make_password
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.accounts.models import User
from django.test import TestCase

# Create your tests here.
from apps.profile.api.views import ProfileDetailView
from apps.profile.models import Profile


class ProfileTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=False)
        self.user = User.objects.create(email='testuser@gmail.com', password=make_password('123456'),
                                        first_name='lorum', last_name='ipsum', gender='Male', dob='2008-03-26')
        self.address = '186 N ave'
        self.dream = 'inception dream'

        profile_object = Profile.objects.get(user=self.user)
        profile_object.address = self.address
        profile_object.dream = self.dream
        profile_object.save()

    def helper_authenticate_user(self, request):
        request.user = self.user
        force_authenticate(request, user=self.user)

    def test_update_profile(self):
        """
        Method to test the update profile method
        :return:
        """
        address = '123 E Unv Drive'
        dob = '2018-02-02'
        request = self.factory.put('view_profile/', {'address': address, 'dob': dob, 'first_name': 'lorum',
                                                     'last_name': 'ipsum', 'email': 'testuser@gmail.com'})
        self.helper_authenticate_user(request)
        ProfileDetailView.as_view()(request, *[], **{})
        profile_obj = (Profile.objects.get(user=self.user))

        # Validating that the data has updated
        self.assertEqual(profile_obj.address, address)
        self.assertEqual(str(self.user.dob), dob)

    def test_get_profile(self):
        """
        Method to test the get profile method which returns the complete profile of the user
        :return:
        """
        request = self.factory.get('view_profile/')
        self.helper_authenticate_user(request)
        response = ProfileDetailView.as_view()(request, *[], **{})
        data = response.data
        # Validating that the response data
        self.assertEqual(data['address'], self.address)
        self.assertEqual(data['dream'], self.dream)

