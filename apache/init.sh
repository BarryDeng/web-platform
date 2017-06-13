#!/bin/bash

#sed -i "s/xxxxxx//" /var/www/html/index.html
apachectl -k start
service php5-fpm start



