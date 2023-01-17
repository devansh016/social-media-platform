FROM node:18.13.0

WORKDIR /social-media-platform

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY . .
EXPOSE $PORT
CMD  ["npm", "start"]