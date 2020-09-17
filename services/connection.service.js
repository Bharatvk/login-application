
var mongojs = require('mongojs');
var connectionService = {};
connectionService.connectDatabase = connectDatabase;
connectionService.getDbCollections = getDbCollections;
connectionService.getdocuments = getdocuments;
module.exports = connectionService;

function connectDatabase(params){
    // console.log("params---p", params);
    return new Promise(function(resolve, reject) {
       
       console.log("hitting connection controller",params);
       try{
       var database = mongojs(params.connection_string, []);
       database.on('error', function(err) {
        console.log('we had an error.', err.toString());
        var error = err.toString()
        resolve({status: "failed", message: "Failed to connect to the database", error: error})
      });
      database.getCollectionNames(function(err, collectionNames){
        console.log("collection names", collectionNames);
        resolve({status: "success", message: "Collections fetched succesfully", collections: collectionNames});
    })
       }
       catch(Err){
        console.log("Errrr" ,Err);
    }
       
    })
}

function getDbCollections(params) {
    return new Promise(function(resolve, reject) {
    const db = mongojs(params.connection_string);
    db.on('error', function(err) {
        console.log('we had an error.', err.toString());
        var error = err.toString()
        resolve({status: "failed", message: "Failed to connect to the database", error: error})
      });
    db.getCollectionNames(function (err, collectionNames) {
        if (err) {
            console.log(err)
            resolve({status: "failed", message: "Failed to connect to the database", error: err})
        } else {
            if (collectionNames.length > 0) {
                resolve({status: "success", message: "Collections fetched succesfully", collections: collectionNames});

            } else {
                res.send({ status: 'Failed' });
            }

        }

    })
});
}

function getdocuments(params) {
    console.log(params)

    collection = params.collection;
    console.log(collection);
    return new Promise(function(resolve, reject) {
    const db = mongojs(params.connection_string);
    db.on('error', function(err) {
        console.log('we had an error.', err.toString());
        var error = err.toString()
        resolve({status: "failed", message: "Failed to connect to the database", error: error})
      });
    db[collection].find({}).limit(10, (err, response) => {
        if (err) {
            resolve({status: "failed", message: "Failed to connect to the database", error: err})
        } else {
        resolve({status: "success", message: "Documents fetched succesfully", documents: response});
            
        }

    })
});
}