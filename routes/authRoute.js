const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/authenticate", authenticate);
router.post("/register", register);

function authenticate(req, res, next){
    authController.authenticate(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function register(req, res, next){
    authController.register(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

module.exports = router;