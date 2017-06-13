#!/bin/bash

#sed -i "s/xxxxxx/$1/" /var/www/html/index.html
cd /usr/share/nginx/html
chmod +x ./docker-entrypoint.sh

apachectl -k stop
cd rcdn
../docker-entrypoint.sh
