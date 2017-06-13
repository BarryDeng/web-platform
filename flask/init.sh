#!/bin/bash

#sed -i "s/xxxxxx/$1/" /var/www/html/index.html
cd /var/www/html
chmod +x ./docker-entrypoint.sh

apachectl -k stop
./docker-entrypoint.sh
