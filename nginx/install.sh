
#!/bin/bash

apt-get install -y nginx php5-cli php5-cgi php5-fpm
rm /usr/share/nginx/html/index.html
rm /etc/nginx/sites-available/default

cp ./bin/index.php /usr/share/nginx/html/
cp ./bin/default /etc/nginx/sites-available/

chown -R www-data:www-data /usr/share/nginx/html/


