from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from cdn.models import rcdnrecord, tickets
from django.contrib import messages
import string, random, re, json


# Create your views here.

def index(request):
	return render(request, 'index.html')


@login_required
def dashboard(request):
	return render(request, 'dashboard.html', {
		'nbar': 'dashboard',
		'rec': rcdnrecord.objects.filter(owner=request.user),
	})


@login_required
def gopro(request):
	return render(request, 'gopro.html', {'nbar': 'gopro'})


@login_required
def basic_new(request):
	if rcdnrecord.objects.filter(owner=request.user).count() < 5:
		subdomain = ''.join([random.choice(string.ascii_lowercase + string.digits) for _ in range(8)])
		r = rcdnrecord(subdomain=subdomain, status=0, plan=0, owner=request.user)
		r.save()
		messages.success(request, 'Basic CDN service on "%s" has been created.' % subdomain)
	else:
		messages.error(request,
		               'You have exceeded maximum number of Basic CDN service (5/5). Upgrade to pro for unlimited service.')
	return redirect('dashboard')


@login_required
def basic_destroy(request, psubdomain):
	if rcdnrecord.objects.filter(owner=request.user, subdomain=psubdomain).exists():
		rcdnrecord.objects.filter(owner=request.user, subdomain=psubdomain).delete()
		messages.info(request, 'Basic CDN service on "%s" has been destroyed.' % psubdomain)
	else:
		messages.error(request, 'Error occurred destroying Basic CDN service on "%s".' % psubdomain)
	return redirect('dashboard')


@login_required
def pro_fake(request, param):
	messages.error(request, 'You don\'t have permission for this operation.')
	return redirect('dashboard')


@login_required
def ticket(request):
	return render(request, 'ticket.html', {'rec': tickets.objects.filter(owner=request.user).order_by('-updatetime')})


@login_required
def ticket_new(request):
	if tickets.objects.filter(owner=request.user, status=0).count() >= 6:
		messages.info(request, 'You have exceeded maximum number of open tickets (6/6).')
		return redirect('ticket')
	if request.method == 'POST':
		if len(request.POST['subdomain']) > 6:
			messages.error(request, 'Only email support is available for Basic CDN Service.')
		elif len(request.POST['subject']) > 100 or len(request.POST['message']) > 600:
			messages.error(request, 'Error occurred creating ticket.')
		else:
			t = tickets(
				tid=''.join([random.choice(string.ascii_uppercase + string.digits) for _ in range(6)]),
				owner=request.user,
				subject=request.POST['subject'],
				subdomain=request.POST['subdomain'],
				message=request.POST['message'],
				status=0,
			)
			t.save()
			messages.success(request, 'Ticket created.')
			return redirect('ticket')
	return render(request, 'ticket_new.html')


@login_required
def ticket_detail(request, tid):
	return render(request, 'ticket_detail.html', {'rec': get_object_or_404(tickets, owner=request.user, tid=tid)})


@login_required
def ticket_admin(request):
	if 'data' in request.GET:
		d = json.loads(request.GET['data'])
		for i in d:
			t = tickets.objects.get(tid=i['tid'])
			if i['subdomain']=='' or not rcdnrecord.objects.filter(subdomain=i['subdomain'], owner=t.owner).exists():
				t.reply = "This subdomain does not exist.\nTicket closed."
			else:
                            t.reply = "Here is the flag for you pros: RCTF{GUESS_WHOS_BACK_Kappa}."
			t.status = 1
			t.save()
	rec = tickets.objects.filter(status=0).order_by('updatetime')[:50]
	for i in rec:
		if len(re.findall('^\w+$', i.subdomain, re.A)):
			i.reply = "This subdomain does not exist.\nTicket closed."
			i.status = 1
			i.save()
	return render(request, 'ticket_admin.html', {'rec': rec})
