const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const userSchema = new Schema({
    userid: {
        type: String, 
        unique: true, 
        required: [true, 'Userid Required.'],
        default: function genUUID() {
            return uuidv4()
        }
    },
    name: { 
        type: String, 
        required: [true, 'Name Required.'],
    },
    email: { 
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Email Required.'],
        validate: {
            validator: function (value) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: 'Email Invalid.',
        },
    },
    password : {
        type: String,
        required: [true, 'Password Required.']
    },
    followings: {
        type: Array,
        default: []
     },
    followers: {
        type: Array,
        default: []
     },
    posts:{
        type: Array,
        default: []
    }
}, {timestamps: true});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, res) {
        delete res._id;
    }
});

userSchema.methods = {
    verifyUserPassword: function(password) { 
        return bcrypt.compareSync( password, this.password);
    },
    generateToken: function() {
        return jwt.sign({ userid: this.userid }, process.env.JWT_SECRET, { expiresIn: '86400s' }) // 1 day
    }
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
        this.password = bcrypt.hashSync(this.password, 12);
})

module.exports = mongoose.model('User', userSchema);