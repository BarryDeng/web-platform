#!/bin/bash

apt-get update && apt-get install -y php5-cli php5-cgi php5-fpm mysql-server
rm /var/www/html/index.html

cp ./bin/* /var/www/html/
mysql -e 'source /var/www/html/config.sql;'
rm /var/www/html/config.sql

chown -R www-data:www-data /var/www/html/



