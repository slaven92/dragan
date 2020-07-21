FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /dragan
WORKDIR /dragan
COPY requirements.txt /dragan/
RUN pip install -r requirements.txt
COPY . /dragan/
CMD [ "daphne", "-b", "0.0.0.0", "-p", "3000","--access-log", "-" , "--proxy-headers", "dragan.asgi:application" ]