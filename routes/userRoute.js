const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateuser = require("../utils/authenticate")

router.get("/user", authenticateuser, getuserprofile);

function getuserprofile(req, res, next){
    userController.getuserprofile(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

module.exports = router;