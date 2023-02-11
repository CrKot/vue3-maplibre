FROM node:16.15.0

WORKDIR /app

ADD . /app

RUN npm install

CMD npm run serve
