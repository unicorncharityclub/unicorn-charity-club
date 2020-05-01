from django.contrib.auth.hashers import make_password
from django.test import TestCase

# Create your tests here.
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.accounts.models import User
from apps.prize.api.views import prize_list
from apps.prize.models import Prize


class PrizeListTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=False)
        self.user = User.objects.create(email='testuser@gmail.com', password=make_password('123456'),
                                        first_name='lorum', last_name='ipsum', gender='Male', dob='2008-03-26')
        Prize.objects.create(category='Animals', tags='Koala', name='Koala', image='upload/image/prize_images/Picture4.png')

    def helper_authenticate_user(self, request):
        request.user = self.user
        force_authenticate(request, user=self.user)

    def test_get_prize_list(self):
        """
        Method to test the get prize list method
        :return:
        """
        request = self.factory.get('prizeList')
        self.helper_authenticate_user(request)
        response = prize_list(request)
        self.assertEqual(response.status_code, 200)