FROM node

RUN apt-get update -q \
  && apt-get install -yq netcat

COPY ./app /srv/app
WORKDIR /srv/app

RUN npm install \
  && npm run typings install \
  && npm run build

CMD ["./bin/run-tests"]
