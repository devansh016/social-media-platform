const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateuser = require("../utils/authenticate")

router.post("/posts", authenticateuser, createpost);
router.delete("/posts/:id", authenticateuser, deletepost);
router.get("/posts/:id", getpostdetails);
router.get("/all_posts",authenticateuser, getallpostdetails);


function createpost(req, res, next){
    postController.createpost(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function deletepost(req, res, next){
    req.body.postid = req.params.id
    postController.deletepost(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function getpostdetails(req, res, next){
    req.body.postid = req.params.id
    postController.getpostdetails(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function getallpostdetails(req, res, next){
    postController.getallpostdetails(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};


module.exports = router;