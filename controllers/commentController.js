const Post = require("../models/postModel");
const { v4: uuidv4 } = require('uuid');

async function comment ({ postid, user, comment }) {
    const post = await Post.findOne({ "id": postid });
    if(post) {
        const commentid = uuidv4();
        post.comments.push({ 
            "userid": user.userid, 
            comment, 
            commentid
        });
        await post.save();
        return { "status": 200, "commentid": commentid };
    } else {
        return { "status": 409, "message": "Post doesn't exitst." };
    }
};


module.exports ={
    comment
}