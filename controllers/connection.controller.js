var express = require('express');
var router = express.Router();
var connectionService = require('../services/connection.service.js');
var mongojs = require('mongojs');
const os = require('os');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var JSONStream = require('JSONStream');
var moment = require('moment');
router.post('/connectDatabase', connectDatabase);
router.post('/getDbCollections', getDbCollections);
router.post('/getdocuments', getdocuments);
router.post('/downloadRecords', downloadRecords);
router.get('/downloadFile/:filename', downloadFile);

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

async function downloadRecords(req, res){
    console.log("req body---", req.body);
    var query = connectionService.constructQuery(req.body);
    var collection = req.body.collection;
    var filename    = 'export.csv';
    // var headers = {
    //     'Content-Type': 'text/csv',
    //     'Content-disposition': 'attachment;filename=' + filename
    // }
    // res.writeHead(200, headers);
    const db = mongojs(req.body.connection_string);
    var dataStream = db[collection].find(query.find,query.projection).sort().skip(query.skip).limit(query.limit).pipe(JSONStream.stringify());
    // var mongoStream = query.stream({transform: JSON.stringify});
    // var parser = new Json2CsvStream();

    //run streams
    var filename = "export_"+moment().format()
    const output = fs.createWriteStream(filename+".csv");
    dataStream.pipe(output);
    output.on('finish', function(){
        var response = {
            filename : filename+".csv"
        }
        res.status(200).json(response);
      });
}

async function downloadFile(req,res){
   console.log("download"); 
var file = "./"+req.params.filename;
var filename = path.basename(file);
var mimetype = mime.lookup(file);
res.setHeader('Content-disposition', 'attachment; filename=' + filename);
res.setHeader('Content-type', mimetype);
var filestream = fs.createReadStream(file);
filestream.pipe(res);
}
module.exports = router;