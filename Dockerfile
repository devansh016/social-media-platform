FROM node:18.13.0

WORKDIR /social-media-platform
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]