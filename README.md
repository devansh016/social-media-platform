# social-media-platform

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) installed.
Also create the .env file and add environment variables as mentioned below.

```sh
git clone git@github.com:devansh016/Minimal-News.git
npm install
npm start
```

## Environment Variable Required

```sh
MONGODB_URL = mongodb://127.0.0.1:27017/social-media
MONGODB_URL_TEST = mongodb://127.0.0.1:27017/social-media-test
JWT_SECRET = Thiswillbeyoursecret
PORT = 80
```

Your app should now be running on [localhost](http://localhost/) at port 80.

## Run the testcases
```sh
npm run test
```
