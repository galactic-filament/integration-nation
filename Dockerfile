FROM node

ENV API_PORT 80
ENV API_HOST ApiServer

# add app dir
ENV APP_DIR /srv/app
COPY ./app $APP_DIR
WORKDIR $APP_DIR

# build app
RUN npm install -s \
  && npm run build -s

CMD ["./bin/run-tests"]
