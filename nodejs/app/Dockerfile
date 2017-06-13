FROM node:alpine

RUN addgroup ctf && adduser -s /bin/sh -DG ctf ctf && \
    # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone && \
    apk del tzdata && \
    mkdir -p /opt/commonjs && \
    mkdir -p /opt/logs

WORKDIR /opt/commonjs
COPY package.json ./package.json
ENV NODE_ENV=production

# yarn --production have a bug
# RUN yarn config set registry https://registry.npm.taobao.org && \
#     yarn && \
#     yarn global add pm2 && \
#     yarn cache clean

RUN npm install --production -s && \
    npm install pm2 -gs && \
    npm cache clean

COPY . .
VOLUME /opt/logs

RUN chmod -R o=rx ./*

EXPOSE 3000


USER ctf
CMD ["npm", "start"]
