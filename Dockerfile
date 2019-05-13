FROM node:8.15.1-alpine

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

USER node

RUN npm install

USER root

COPY . .
RUN chown -R node:node .

USER node

CMD ["npm", "start"]
