var express = require('express');
var router = express.Router();
var connectionService = require('../services/connection.service.js');


router.post('/connectDatabase', connectDatabase);
router.post('/getDbCollections', getDbCollections);
router.post('/getdocuments', getdocuments);
async function connectDatabase(req, res){
    try {
        console.log("in controller")
        var userResponse = await connectionService.connectDatabase(req.body);
        if(userResponse.status == "success"){
            res.status(200).json(userResponse)
        } else {

            res.status(200).json(userResponse)
        }
    } catch(err){
        //update error logs
    }
}

async function getDbCollections(req, res){
    try {
        console.log("in controller")
        var userResponse = await connectionService.getDbCollections(req.body);
        if(userResponse.status == "success"){
            res.status(200).json(userResponse)
        } else {

            res.status(200).json(userResponse)
        }
    } catch(err){
        //update error logs
    }
}

async function getdocuments(req, res){
    try {
        console.log("in controller")
        var userResponse = await connectionService.getdocuments(req.body);
        if(userResponse.status == "success"){
            res.status(200).json(userResponse)
        } else {

            res.status(200).json(userResponse)
        }
    } catch(err){
        //update error logs
    }
}

module.exports = router;