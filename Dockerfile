FROM node

RUN apt-get update -q \
  && apt-get install -yq netcat

# add user
ENV APP_USER integration-nation
ENV APP_DIR /home/$APP_USER/app
RUN useradd -ms /bin/bash $APP_USER
USER $APP_USER

# add app dir
RUN mkdir $APP_DIR
WORKDIR $APP_DIR
COPY ./app $APP_DIR

RUN npm install --silent \
  && npm run typings install --silent \
  && npm run build --silent

CMD ["./bin/run-tests"]
