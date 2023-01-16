const User = require("../models/userModel");
const Post = require("../models/postModel");
const { v4: uuidv4 } = require('uuid');

async function createpost ({ user, title, description }) {
    try {
        user = await User.findOne({ userid: user.userid });
        if(user) {
            const post = new Post({ title, description, id: uuidv4() });
            await post.save();
            user.posts.push(post.id);
            await user.save();
            return { 
                "status": 200, 
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "createdAt": post.createdAt
            };
        } else {
            return { "status": 403, "message": "No user exist with this id." };
        }
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
};

async function deletepost ({ user, postid }) {
    try {
        const post = await Post.findOne({ "id": postid });
        user = await User.findOne({ "userid": user.userid }); 
        if(!post)
            return { "status": 407, "message": "Post doesn't exist." };
        else if(!user.posts.includes(postid))
            return { "status": 403, "message": "You don't have permission to delete this post." };
        else {
            await Post.deleteOne({"id": postid});
            user.posts.pop(post.postid);
            await user.save();
            return { "status": 200, "message": "Post Deleted." };
        }
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
};

async function getpostdetails ({ postid }) {
    try {
        const post = await Post.findOne({ id: postid });
        if(post) {
            return { 
                "status": 200, 
                "likes": post.likes.length,
                "comments": post.comments.length,
            };
        } else {
            return { "status": 403, "message": "No post exist with this id." };
        }
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }  
};

async function getallpostdetails ({ user }) {
    try {
        user = await User.findOne({ "userid": user.userid });
        if(user.posts.length==0)
            return { "status": 200, posts: []};
        var posts = await Post.find( { id : { $in : user.posts }} , {id: 1, title: 1, description: 1, createdAt: 1, comments: 1, numberoflikes: { $size: "$likes" }});
        posts.sort(function(a, b) {
            return a.createdAt - b.createdAt;
        });
        return { "status": 200, posts };
    } catch (error) {
        console.log(error)
        return { "status": 500, "message": "Internal Server Error." };
    }
    
};

module.exports ={
    createpost,
    deletepost,
    getpostdetails,
    getallpostdetails
}