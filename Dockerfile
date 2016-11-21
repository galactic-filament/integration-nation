FROM node

RUN apt-get update -q \
  && apt-get install -yq netcat

COPY ./app /srv/app
WORKDIR /srv/app

CMD ["./bin/run-tests"]
