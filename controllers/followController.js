const User = require("../models/userModel");

async function follow ({ target_userid, user }) {
    if(user.userid == target_userid){
        return { "status": 409, "message": "You can't follow yourself." };
    }
    const targetuser = await User.findOne({ "userid": target_userid});
    user = await User.findOne({ "userid": user.userid });
    if(targetuser) {
        if(!user.followings.includes(target_userid)) {
            // Adding user to target user followers
            targetuser.followers.push(user.userid);
            await targetuser.save();
            // Adding following to user profile
            user.followings.push(target_userid);
            await user.save();
            return { "status": 200, "message": "You started following " + targetuser.name + "." };
        } else {
            return { "status": 207, "message": "You are already following " + targetuser.name + "." };
        }
    } else {
        return { "status": 409, "message": "No user exist with this id." };
    }
};

async function unfollow ({ target_userid, userid }) {
    if(userid == target_userid){
        return { "status": 403, "message": "You can't unfollow yourself." };
    }
    const targetuser = await User.findOne({ "userid": target_userid});
    const user = await User.findOne({ userid });
    if(targetuser) {
        if(user.followings.includes(target_userid)){
            // Adding user to target user followers
            targetuser.followers.pop(userid);
            await targetuser.save();
            // Adding following to user profile
            user.followings.pop(target_userid);
            await user.save();
            return { "status": 200, "message": "You are now not following " + targetuser.name + "." };
        } else {
            return { "status": 407, "message": "You are not following " + targetuser.name + "." };
        }
    } else {
        return { "status": 409, "message": "No user exist with this id." };
    }
};

module.exports ={
    follow,
    unfollow
}