#!/bin/bash
echo Relink nginx conf.
rm -rf /etc/nginx/sites-enabled/default
ln -s /usr/share/nginx/html/nginx.conf /etc/nginx/sites-enabled/default
echo Starting Nginx.
service nginx start
echo Starting Gunicorn.
exec nohup gunicorn rcdn.wsgi:application \
    --bind 127.0.0.1:8000 \
    --workers 5 \
    "$@" &
