FROM node:8.15.1-alpine

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

USER node

RUN npm install

USER root

RUN apk add --no-cache openssl
RUN openssl req -nodes -new -x509 -newkey rsa:4096 -days 3650 -subj "/C=XX/ST=XX/L=XX/O=XX/CN=XX" -keyout server.key -out server.cert

COPY . .
RUN chown -R node:node .

USER node

CMD ["npm", "start"]
