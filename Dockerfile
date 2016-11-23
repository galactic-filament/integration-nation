FROM node

RUN apt-get update -q \
  && apt-get install -yq netcat

ENV APP_USER integration-nation
ENV APP_DIR /home/$APP_USER/app
RUN useradd -ms /bin/bash $APP_USER
USER $APP_USER
RUN mkdir $APP_DIR
WORKDIR $APP_DIR
COPY ./app $APP_DIR

RUN npm install \
  && npm run typings install \
  && npm run build

CMD ["./bin/run-tests"]
