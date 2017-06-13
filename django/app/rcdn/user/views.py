from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


# Create your views here.

def signin(request):
	if request.method == 'POST':
		form = AuthenticationForm(data=request.POST)
		if form.is_valid():
			login(request, form.get_user())
			return redirect(request.POST.get('next', 'dashboard'))
	else:
		form = AuthenticationForm()
	return render(request, 'signin.html', {'form': form, 'nbar': 'signin'})


def signup(request):
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			raw_password = form.cleaned_data.get('password1')
			user = authenticate(username=username, password=raw_password)
			login(request, user)
			return redirect('index')
	else:
		form = UserCreationForm()
	return render(request, 'signup.html', {'form': form, 'nbar': 'signup'})

def signout(request):
	logout(request)
	return redirect('index')