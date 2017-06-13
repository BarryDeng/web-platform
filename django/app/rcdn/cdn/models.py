from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

# Create your models here.
class rcdnrecord(models.Model):
	STATUS_CHOICES = (
		('0', 'Pending'),
		('1', 'Active'),
		('2', 'Suspended'),
	)
	PLAN_CHOICES = (
		('0', 'Basic'),
		('1', 'Pro'),
	)
	subdomain = models.CharField(max_length=10)
	status = models.CharField(max_length=1, choices=STATUS_CHOICES)
	plan = models.CharField(max_length=1, choices=PLAN_CHOICES)
	owner = models.ForeignKey(User)

	def __str__(self):
		return self.subdomain

class rcdnrecord_admin(admin.ModelAdmin):
	list_display = ('subdomain', 'status', 'plan', 'owner')

admin.site.register(rcdnrecord, rcdnrecord_admin)

class tickets(models.Model):
	STATUS_CHOICES = (
		('0', 'Open'),
		('1', 'Closed'),
	)
	tid = models.CharField(max_length=6, primary_key=True)
	subject = models.CharField(max_length=100)
	subdomain = models.CharField(max_length=6)
	message = models.CharField(max_length=600)
	status = models.CharField(max_length=1, choices=STATUS_CHOICES)
	owner = models.ForeignKey(User)
	reply = models.CharField(max_length=600)
	updatetime = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return self.subdomain

class tickets_admin(admin.ModelAdmin):
	list_display = ('subdomain', 'status', 'owner')

admin.site.register(tickets, tickets_admin)