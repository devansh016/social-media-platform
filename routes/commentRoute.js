const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticateuser = require("../utils/authenticate")

router.post("/comment/:id", authenticateuser, comment);

function comment(req, res, next){
    req.body.postid = req.params.id;
    commentController.comment(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

module.exports = router;