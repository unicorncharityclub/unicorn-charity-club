from django.contrib.auth.hashers import make_password
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.accounts.models import User
from django.test import TestCase, Client

# Create your tests here.
from apps.profile.api.views import ProfileDetailView
from apps.profile.models import Profile


class ProfileTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=False)
        self.address = '123 E Unv Drive'
        self.user = User.objects.create(email='testuser@gmail.com', password=make_password('123456'),
                                        first_name='lorum', last_name='ipsum', gender='Male', dob='2008-03-26')

    def test_update_profile(self):
        request = self.factory.put('view_profile/', {'address': self.address,
                                                     'dob': '2018-02-02'})
        force_authenticate(request, user=self.user)
        ProfileDetailView.as_view()(request, *[], **{})
        profile_obj = (Profile.objects.get(user = self.user))
        self.assertEqual(profile_obj.address, self.address)
