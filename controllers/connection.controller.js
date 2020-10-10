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
    var allFieldslist = [];
    // var headers = {
    //     'Content-Type': 'text/csv',
    //     'Content-disposition': 'attachment;filename=' + filename
    // }
    // res.writeHead(200, headers);
    const db = mongojs(req.body.connection_string);
    var dataStream = db[collection].find(query.find,query.projection,{timeout: false}).sort().skip(query.skip).limit(query.limit);
    // var mongoStream = query.stream({transform: JSON.stringify});
    // var parser = new Json2CsvStream();
    dataStream.on('data', function (doc) {
        // console.log('new document', doc)
        var keys = getAllkeys(doc);
        console.log("keys===", keys);     

        allFieldslist= allFieldslist.concat(keys);
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          allFieldslist = allFieldslist.filter(onlyUnique); 
    })
    //run streams
    var filename = "export_"+moment().format();
    const output = fs.createWriteStream(filename+".txt");
    dataStream.pipe(JSONStream.stringify()).pipe(output);
    output.on('finish', function(){
        const transformOpts = { highWaterMark: 16384};
    const input = fs.createReadStream(filename+".txt");
    const mewoutput = fs.createWriteStream(filename+".csv");
    const { Transform } = require('json2csv');
    const fields = allFieldslist;
const opts = { fields };
    const json2csv = new Transform(opts,transformOpts);
    input.pipe(json2csv).pipe(mewoutput);
    mewoutput.on('finish', function(){
        console.log("finished csv");
        var response = {
            filename : filename+".csv"
        }
        res.status(200).json(response);
    })
// const fields = ['field1', 'field2', 'field3'];
// const opts = { fields };
// const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };
//         var response = {
//             filename : filename+".csv"
//         }
//         res.status(200).json(response);
      });
}

function getAllkeys(o,s){
    console.log("get keys", o);
    o._id = o._id.toString();

    var keys = [];
    try{
        f=(o,s)=>{
            // console.log("inside function1", s);
            if(o != undefined && o!= null){
                [o]==o||Object.keys(o).map(k=>
                    f(o[k],k=s?s+["."+k]:k,
                    validate(k)))};
                  
            }   
        f(o);
        function validate(k){
            var tempkey = k
console.log("inside validate", k,typeof o[k], k.split(".").length-1);
            if(typeof o[k] != "object"){
                if(typeof o[k] == "undefined"){
                    var tempArray = k.split(".");
                    for(var i =0; i < tempArray.length; i ++){
                       
                    }
                }
            }
        }
        return keys;    
        
    }catch(err){
        console.log("err", err);
    }
  
}

async function downloadFile(req,res){
   console.log("download", req.params.filename); 
   try{

var file = "./"+req.params.filename;
var filename = path.basename(file);
var mimetype = mime.lookup(file);
res.setHeader('Content-disposition', 'attachment; filename=' + filename);
res.setHeader('Content-type', mimetype);
var filestream = fs.createReadStream(file);
filestream.pipe(res);

}catch(err){
    console.log("err", err);
}
}

testFunn()
function testFunn(){
    var testObj = {
        "_id": "5e3a84fca033dc22b801a02b",
        "vertical_id": 465424716,
        "vertical_title": "Home Improvement",
        "vertical_permalink": "home-improvement",
        "vertical_image": "",
        "is_active": false,
        "created_at": "2020-02-05T14:33:56+05:30",
        "created_by": "madhuresh",
        "rating_attributes": [
          {
            "rating_title": "Over All Rating",
            "rating_index": "5",
            "rating_enabled": true
          },
          {
            "rating_title": "Service Timeliness",
            "rating_index": "5",
            "rating_enabled": true
          }
        ],
        "article_seo": {
          "article_seo_description": "",
          "article_json_ld": "",
          "article_seo_keywords": "",
          "article_seo_title": ""
        },
        "additional_company_fields": [],
        "is_deleted": false,
        "history": [
          {
            "created_by": "madhuresh",
            "created_at": "2020-02-05T14:33:56+05:30"
          },
          {
            "update_by": 184934162,
            "updated_at": "2020-02-17T09:30:56+05:30"
          },
          {
            "update_by": 184934162,
            "updated_at": "2020-02-18T17:23:20+05:30"
          },
          {
            "update_by": 6106989531,
            "updated_at": "2020-03-02T09:59:48+00:00"
          },
          {
            "update_by": 6106989531,
            "updated_at": "2020-03-02T10:27:33+00:00"
          },
          {
            "update_by": 6106989531,
            "updated_at": "2020-03-02T10:36:33+00:00"
          },
          {
            "update_by": 7676733332,
            "updated_at": "2020-03-03T09:29:22+00:00"
          }
        ],
        "updated_at": "2020-03-03T09:29:22+00:00",
        "updated_by": 7676733332
      }
      console.log(testObj["history"]);
}
module.exports = router;