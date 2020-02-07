from ..models import User
from ..forms import UserRegisterForm

from django.shortcuts import render, redirect


def register_user_view(request):
    form = UserRegisterForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            user = form.save()
        else:
            form = UserRegisterForm()
        return redirect('/')
    return render(request, 'register.html', {'form': form})


