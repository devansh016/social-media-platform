const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('dotenv').config();

const postSchema = new Schema({
    id: {
        type: String, 
        unique: true, 
        required: [true, 'postid Required.'],
    },
    title: { 
        type: String, 
        required: [true, 'Title Required.'],
    },
    description: { 
        type: String,
        required: [true, 'Description Required.'],
    },
    comments: [{
        userid: {
            type: String, 
        },
        commentid: {
            type: String, 
        },
        comment: {
           type: String,
        }
    }],
    likes: {
        type: Array,
        default: []
    },
}, {timestamps: true}
);

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, res) {
        delete res._id;
    }
});

module.exports = mongoose.model("Post", postSchema);