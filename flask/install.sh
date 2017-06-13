#!/bin/bash

apt-get update -y
apt-get install python3 python3-pip -y
pip3 install -i https://mirrors.aliyun.com/pypi/simple flask gunicorn gevent

cp -rf ./app/* /var/www/html

chown -R www-data:www-data /var/www/html/