#!/bin/bash

addgroup ctf
useradd -s /bin/sh -g ctf ctf
mkdir /home/ctf
chown ctf:ctf /home/ctf
mkdir -p /opt/commonjs
mkdir -p /opt/logs

cp -r app/* /opt/commonjs
cd /opt/commonjs
export NODE_ENV=production

apt-get install -y redis-server
wget https://npm.taobao.org/mirrors/node/latest-v7.x/node-v7.9.0-linux-x64.tar.gz
tar xzf node-v7.9.0-linux-x64.tar.gz
export PATH=node-v7.9.0-linux-x64/bin:$PATH
npm config set registry https://registry.npm.taobao.org

npm install --production -s
npm install pm2 -gs
npm cache clean

chmod -R o=rx ./*
