FROM --platform=linux/amd64 node:20

ENV APP_HOME /app

WORKDIR $APP_HOME
COPY ./ $APP_HOME

RUN npm install --ignore-scripts

EXPOSE 8000/tcp

CMD npm run start