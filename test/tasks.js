const chai = require("chai");
const chaiHttp = require("chai-http");
require("dotenv").config()
process.env.NODE_ENV = 'test'
const server = require("../index");

chai.should();
chai.use(chaiHttp);

var mongoose = require('mongoose');
const User = require("../models/userModel");

before(async function() {
    mongoose.connect(process.env.MONGODB_URL_TEST,async function(){
        await mongoose.connection.db.dropDatabase();
    });
    var user = new User({ userid: "1", name: "Tester Man", email: "testerman@gmail.com", password: "password" });
    await user.save();
    user = new User({ userid: "2", name: "Tester Women", email: "testerwoman@gmail.com", password: "password" });
    await user.save();
});

var credentials = { email: 'testerman@gmail.com', password: 'password' };

describe('Authenticate API', () => {
    // Test Authenticate User
    describe(" Post /api/authenticate", () => {
        it("It should authenticate user and give jwt token", (done) =>{
            chai.request(server)
                .post("/api/authenticate")
                .send(credentials)
                .end((error, response) =>{
                    response.should.have.status(200);
                    response.body.should.have.property('token')
                done();
                })
        })
    })
})

describe('Post API', () => {

    var token = null;

    before(function(done) {
        chai.request(server)
            .post('/api/authenticate')
            .send(credentials)
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
      });

    var postid = null;

    describe(" Post /api/posts", () => {
        it("It should create a post", (done) =>{
            chai.request(server)
                .post("/api/posts")
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send({
                    "title": "Hello World!",
                    "description": "This post say hello to world."
                })
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.have.property('id');
                    postid = res.body.id;
                done();
                })
        });
    });

    describe(" Get /api/posts/:id", () => {
        it("It should get a post", (done) =>{
            chai.request(server)
                .get("/api/posts/"+ postid )
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) =>{
                    res.should.have.status(200);
                done();
                })
        });
    });

    describe(" Get /api/all_posts", () => {
        it("It should get all post", (done) =>{
            chai.request(server)
                .get("/api/all_posts")
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) =>{
                    res.should.have.status(200);
                done();
                })
        });
    });

    describe(" Delete /api/posts/:id", () => {
        it("It should delete post", (done) =>{
            chai.request(server)
                .delete("/api/posts/"+ postid )
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) =>{
                    res.should.have.status(200);
                done();
                })
        });
    });
});

describe('Comment API', () => {

    let token = null;
    let postid = null;

    before(function(done) {
        chai.request(server)
            .post('/api/authenticate')
            .send(credentials)
            .end(function(err, res) {
                token = res.body.token;
                done()
            });
    });

    before(function(done) {
        chai.request(server)
            .post("/api/posts")
            .set("Authorization", "Bearer " + token) 
            .set({'Accept': 'application/json'})
            .send({
                "title": "Hello World!",
                "description": "This post say hello to world."
            })
            .end((error, res) =>{
                postid = res.body.id;
            done();
            })
    });

    describe(" Post /api/comment", () => {
        it("It should comment on a post", (done) =>{
            chai.request(server)
                .post("/api/comment/"+ postid)
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send({
                    "comment": "This is a comment.",
                })
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.have.property('commentid');
                done();
                })
        });
    });


});

describe('Like API', () => {

    let token = null;
    let postid = null;

    before(function(done) {
        chai.request(server)
            .post('/api/authenticate')
            .send(credentials)
            .end(function(err, res) {
                token = res.body.token;
                done()
            });
    });

    before(function(done) {
        chai.request(server)
            .post("/api/posts")
            .set("Authorization", "Bearer " + token) 
            .set({'Accept': 'application/json'})
            .send({
                "title": "Hello World!",
                "description": "This post say hello to world."
            })
            .end((error, res) =>{
                postid = res.body.id;
            done();
            })
    });

    describe(" Post /api/like/:id", () => {
        it("It should like a post", (done) =>{
            chai.request(server)
                .post("/api/like/"+ postid)
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        });
    });

    describe(" Post /api/unlike/:id", () => {
        it("It should unlike a post", (done) =>{
            chai.request(server)
                .post("/api/unlike/"+ postid)
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        });
    });


});

describe('Follow API', () => {

    let token = null;

    before(function(done) {
        chai.request(server)
            .post('/api/authenticate')
            .send(credentials)
            .end(function(err, res) {
                token = res.body.token;
                done()
            });
    });

    describe(" Post /api/follow/:id", () => {
        it("It should follow a user", (done) =>{
            chai.request(server)
                .post("/api/follow/2")
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        });
    });

    describe(" Post /api/unfollow/:id", () => {
        it("It should unfollow a user", (done) =>{
            chai.request(server)
                .post("/api/unfollow/2")
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        });
    });


});

describe('User API', () => {

    let token = null;

    before(function(done) {
        chai.request(server)
            .post('/api/authenticate')
            .send(credentials)
            .end(function(err, res) {
                token = res.body.token;
                done()
            });
    });

    describe(" Get /api/user", () => {
        it("It should get user followers and followings", (done) =>{
            chai.request(server)
                .get("/api/user")
                .set("Authorization", "Bearer " + token) 
                .set({'Accept': 'application/json'})
                .send()
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("followers");
                    res.body.should.have.property("followings");
                done();
                })
        });
    });
});

after(function(done){
    mongoose.connect(process.env.MONGODB_URL_TEST,async function(){
        mongoose.connection.db.dropDatabase();
    });
    mongoose.connection.close()
    done();
})
