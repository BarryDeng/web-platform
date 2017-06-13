from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
	url(r'^dashboard$', views.dashboard, name='dashboard'),
	url(r'^gopro$', views.gopro, name='gopro'),
	url(r'^dashboard/basic/new$', views.basic_new, name='basic_new'),
	url(r'^dashboard/basic/destroy/(?P<psubdomain>\w{8})$', views.basic_destroy, name='basic_destroy'),
	url(r'^dashboard/pro/new/(?P<param>\w{3,8})$', views.pro_fake),
	url(r'^dashboard/pro/destroy/(?P<param>\w{3,})$', views.pro_fake),
	url(r'^dashboard/pro/cname/(?P<param>\w{3,8})$', views.pro_fake, name='pro_cname'),
	url(r'^dashboard/pro/sslcert/(?P<param>\w{3,8})$', views.pro_fake, name='pro_sslcert'),
	url(r'^suppout/ticket$', views.ticket, name='ticket'),
	url(r'^suppout/ticket/new$', views.ticket_new, name='ticket_new'),
	url(r'^suppout/ticket/detail/(?P<tid>\w{6})$', views.ticket_detail, name='ticket_detail'),
	url(r'^suppout/ticket/url_for_bot_never_can_you_find_this$', views.ticket_admin, name='ticket_admin'),
]
