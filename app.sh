#!/bin/bash

daphne -b 0.0.0.0 -p 8000 --access-log - --proxy-headers dragan.asgi:application