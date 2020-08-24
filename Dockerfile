FROM python:3
ENV PYTHONUNBUFFERED 1
ENV PORT 8000
RUN mkdir /dragan
WORKDIR /dragan
COPY requirements.txt /dragan/
RUN pip install -r requirements.txt
COPY . /dragan/
# another comment for testing
RUN python manage.py collectstatic --noinput
EXPOSE $PORT
# CMD gunicorn -b 0.0.0.0:$PORT -w 2 --access-logfile - -k uvicorn.workers.UvicornWorker dragan.asgi:application
CMD daphne -b 0.0.0.0 -p $PORT --access-log - --proxy-headers dragan.asgi:application
