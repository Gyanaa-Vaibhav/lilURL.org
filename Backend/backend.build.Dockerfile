FROM node:current-alpine

WORKDIR app

COPY package.json .

RUN npm ci

COPY . .

CMD ['npm','run','runDev']