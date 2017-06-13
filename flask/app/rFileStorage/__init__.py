from flask import Flask, request, send_file, make_response
from hashlib import md5
from time import time
from urllib.parse import quote, unquote
from io import BytesIO
from .conf import *
import os, json

fpath = os.path.split(os.path.abspath(__file__))[0]
os.chdir(fpath)
app = Flask(__name__, static_url_path = '', static_folder = 'static')
app.config['SECRET_KEY'] = SECRET_KEY

@app.route('/')
def indexpage():
	return app.send_static_file('index.html')

@app.route('/api/download')
def listfiles():
	ret = []
	p = fpath + '/res'
	ts = t()
	for i in os.listdir(p):
		if os.path.isfile(os.path.join(p, i)):
			s = os.stat(os.path.join(p, i))
			ret.append({'fname': i, 'mtime': s.st_mtime, 'size': s.st_size, 'token': h(ts + i)})
	return json.dumps(ret), 200, {'Content-Type': 'application/json, charset=utf-8'}

@app.route('/api/download/<token>/<path:fname>')
def download(token, fname):
	ts = t()
	msg = ''
	code = 0
	f = os.path.abspath('res/' + fname)
	if token != h(ts + fname):
		msg = 'token expired'
	elif fname[-3:] == '.py':
		msg = 'filetype not allowed'
	elif not f.startswith(fpath):
		msg = 'path traversal not allowed'
	elif os.path.isfile(f):
		if 'X-Requested-With' in request.headers and request.headers['X-Requested-With'] == 'XMLHttpRequest':
			code = 1
			msg = 'success'
		else:
			with open(os.path.abspath('res/' + fname), 'rb') as f:
				data = f.read()
			response = make_response(send_file(BytesIO(data),mimetype='application/octet-stream'))
			response.headers['Content-Disposition'] = 'attachment; filename=%s' % quote(fname.encode('utf-8'))
			return response
	else:
		msg = 'unknown error'
	return json.dumps({'code': code, 'msg': msg}), 200, {'Content-Type': 'application/json, charset=utf-8'}

def h(s):
	return md5(s.encode('utf-8')).hexdigest()

def t():
	_t = int(time())
	return str(_t + 60 - _t % 60)

if __name__ == '__main__':
	app.run('0.0.0.0')