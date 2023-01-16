const User = require("../models/userModel");
require('dotenv').config();

async function getuserprofile ({ user }) {
    try {
        return { 
            "status": 200, 
            "name": user.name,
            "followers": user.followers.length,
            "followings": user.followings.length
        };
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
};

module.exports ={
    getuserprofile
}