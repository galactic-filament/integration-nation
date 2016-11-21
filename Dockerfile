FROM node

RUN apt-get update -q \
  && apt-get install -yq netcat

ENV APP_USER integration-nation
RUN useradd -ms /bin/bash $APP_USER
USER $APP_USER
WORKDIR /home/$APP_USER
COPY ./app /home/$APP_USER

RUN npm install \
  && npm run typings install \
  && npm run build

CMD ["./bin/run-tests"]
