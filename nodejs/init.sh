#!/bin/bash

#sed -i "s/xxxxxx/$1/" /var/www/html/index.html

su - ctf <<HERE
cd /opt/commonjs
export PATH=/opt/commonjs/node-v7.9.0-linux-x64/bin:$PATH
npm start
HERE &
