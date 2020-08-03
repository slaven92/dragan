FROM python:3
ENV PYTHONUNBUFFERED 1
ENV PORT 8000
RUN mkdir /dragan
WORKDIR /dragan
COPY requirements.txt /dragan/
RUN pip install -r requirements.txt
COPY . /dragan/
# another comment for testing
EXPOSE $PORT
CMD gunicorn -b 0.0.0.0:$PORT -w 4 -k uvicorn.workers.UvicornWorker dragan.asgi:application
# CMD daphne -b 0.0.0.0 -p $PORT --access-log - --proxy-headers dragan.asgi:application
