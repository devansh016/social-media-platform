const express = require("express");
const router = express.Router();
const authenticateuser = require("../utils/authenticate")
const followController = require("../controllers/followController");

router.post("/follow/:id", authenticateuser, follow);
router.post("/unfollow/:id", authenticateuser, unfollow);

function follow(req, res, next){
    req.body.target_userid = req.params.id;
    followController.follow(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function unfollow(req, res, next){
    req.body.target_userid = req.params.id;
    followController.unfollow(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};


module.exports = router;