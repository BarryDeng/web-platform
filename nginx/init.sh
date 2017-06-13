
#!/bin/bash

#sed -i "s/xxxxxx/$1/" /var/www/html/index.html
apachectl -k stop
service nginx start
service php5-fpm start


