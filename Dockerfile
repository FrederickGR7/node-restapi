FROM node:14.16.0-alpine3.10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g typescript 
RUN npm install

# Bundle app source
COPY . .
RUN chgrp -R 0 /usr/src/app && \
    chmod -R g=u /usr/src/app

RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]