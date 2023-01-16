const Post = require("../models/postModel");

async function like ({ postid, user }) {
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
};

async function unlike ({ postid, user }) {
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
};

module.exports ={
    like,
    unlike
}