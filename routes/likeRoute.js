const express = require("express");
const router = express.Router();
const authenticateuser = require("../utils/authenticate")
const likeController = require("../controllers/likeController");

router.post("/like/:id", authenticateuser, like);
router.post("/unlike/:id", authenticateuser, unlike);

function like(req, res, next){
    req.body.postid = req.params.id;
    likeController.like(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function unlike(req, res, next){
    req.body.postid = req.params.id;
    likeController.unlike(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};


module.exports = router;