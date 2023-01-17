require("dotenv").config()
const mongoose = require("mongoose")

const connectionOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

mongoose.set("strictQuery", false);
if (process.env.NODE_ENV == 'test' )
    mongoose.connect(process.env.MONGODB_URL_TEST, connectionOptions)
else
    mongoose.connect(process.env.MONGODB_URL, connectionOptions)
mongoose.Promise = global.Promise

const connection = mongoose.connection;

module.exports = connection