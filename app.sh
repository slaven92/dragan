#!/bin/bash

# python manage.py migrate

gunicorn -b 0.0.0.0:8000 -w 4 -k uvicorn.workers.UvicornWorker dragan.asgi:application

# daphne -b 0.0.0.0 -p 8000 --access-log - --proxy-headers dragan.asgi:application