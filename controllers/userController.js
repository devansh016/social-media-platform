const User = require("../models/userModel");
require('dotenv').config();

async function getuserprofile ({ user }) {
    return { 
        "status": 200, 
        "name": user.name,
        "followers": user.followers.length,
        "followings": user.followings.length
    };
};

module.exports ={
    getuserprofile
}