var express = require('express');
var router = express.Router();
var userService = require('../services/user.service.js');
const passport = require('passport');

require('../config/passport')(passport)

router.post('/createUser', createUser);
router.post('/authenticate', authenticate);
router.post('/test', passport.authenticate('jwt', { session : false }), test);


module.exports = router;

async function createUser(req, res){
    try {
        console.log("in controller")
        var userResponse = await userService.createUser(req.body);
        if(userResponse.status == "success"){
            res.status(200).json(userResponse)
        } else {
            res.status(500).json(userResponse)
        }
    } catch(err){
        //update error logs
    }
}

async function authenticate(req, res){
    try {
        console.log("in controller")
        var userResponse = await userService.authenticate(req.body);
        if(userResponse.status == "success"){
            res.status(200).json(userResponse)
        } else {
            res.status(500).json(userResponse)
        }
    } catch(err){
        //update error logs
    }
}


async function test(req, res, next){
    try {
        console.log("test")
        
        res.status(200).json({})  
        
    } catch(err){
        //update error logs
    }
}
