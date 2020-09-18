
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
    skip = (params.skip!=null)?parseInt(params.skip):0;

    limit = (params.limit!=null)?parseInt(params.limit):20;

    find = (params.find_query!=null)?JSON.parse(params.find_query):{};

    projection = (params.projection!=null)?JSON.parse(params.projection):{};

    sort = (params.sort!=null)?JSON.parse(params.sort):{};

    // ,filter,projection,skip,limit
    return new Promise(function(resolve, reject) {
    const db = mongojs(params.connection_string);

    db.on('error', function(err) {
        console.log('we had an error.', err.toString());
        var error = err.toString()
        resolve({status: "failed", message: "Failed to connect to the database", error: error})
      });

    db[collection].find(find,projection).sort().skip(skip).limit(limit, (err, response) => {
        if (err) {
            resolve({status: "failed", message: "Failed to connect to the database", error: err})
        } else {
        resolve({status: "success", message: "Documents fetched succesfully", documents: response});
            
        }

    })
});
}