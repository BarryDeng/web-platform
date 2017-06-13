#!/bin/bash
exec nohup gunicorn rFileStorage:app \
    -k gevent \
    --bind 0.0.0.0:80 \
    --worker-connections 1000 \
    --access-logfile ./access.log \
    --error-logfile ./error.log \
    "$@" &
