const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function authenticate({ email, password }) {
    try {
        const user = await User.findOne({ email });
        if(user && user.verifyUserPassword(password)) {
            return { "status": 200, "token": user.generateToken() };
        } else {
            return { "status": 403, "message": "Wrong email or password." };
        }
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
    
};

async function register({name, email, password }) {
    try {
        if (await User.findOne({ email })) {
            return { "success": false, "status": 409, "message": "Email id " + email + " is already in use." }
        } else {
            const user = new User({ name, email, password });
            await user.save();
            return { "success": true, "status": 200 };
        }  
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
};

module.exports ={
    authenticate,
    register
}