const Post = require("../models/postModel");

async function like ({ postid, user }) {
    try {
        const post = await Post.findOne({ "id": postid });
        if(post) {
            if(!post.likes.includes(user.userid)){
                post.likes.push(user.userid);
                await post.save();
                return { "status": 200, "message": "You liked the post." };
            } else {
                return { "status": 407, "message": "You already liked the post." };
            }
        } else {
            return { "status": 407, "message": "Post doesn't exitst." };
        } 
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
};

async function unlike ({ postid, user }) {
    try {
        const post = await Post.findOne({ "id": postid });
        if(post) {
            if(post.likes.includes(user.userid)){
                post.likes.pop(user.userid);
                await post.save();
                return { "status": 200, "message": "You unliked the post." };
            } else {
                return { "status": 403, "message": "You are not liking the post." };
            }
        } else {
            return { "status": 403, "message": "Post doesn't exitst." };
        } 
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
    
};

module.exports ={
    like,
    unlike
}