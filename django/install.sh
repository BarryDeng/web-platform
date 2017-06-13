#!/bin/bash

apt-get update -y
apt-get install python3 python3-pip nginx -y
pip3 install -i https://mirrors.aliyun.com/pypi/simple django gunicorn gevent

cp -rf ./app/* /usr/share/nginx/html

chown -R www-data:www-data /usr/share/nginx/html