const express = require("express");
const app = express();
const database = require("./utils/database");
const port = process.env.PORT || 80;

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Routes
const authRoute = require("./routes/authRoute");
app.use("/api", authRoute);
const followRoute = require("./routes/followRoute");
app.use("/api", followRoute);
const userRoute = require("./routes/userRoute");
app.use("/api", userRoute);
const postRoute = require("./routes/postRoute");
app.use("/api", postRoute);
const likeRoute = require("./routes/likeRoute");
app.use("/api", likeRoute);
const commentRoute = require("./routes/commentRoute");
app.use("/api", commentRoute);

// Database Connection
database.on("error", console.error.bind(console, "connection error: "));
database.once("open", function () {
    console.log("Database Connected successfully");
})

// Starting Port
app.listen(port, function(){
    console.log("App is running at port " + port);
});

module.exports = app;
