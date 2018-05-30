FROM node:6.9.4-alpine

# Create app directory
RUN mkdir -p /home/app
WORKDIR /home/app


# Install app dependencies

COPY package.json /home/app
RUN npm install;


# Bundle app source
COPY . /home/app

CMD npm start