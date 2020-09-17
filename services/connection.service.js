
var mongojs = require('mongojs');
var connectionService = {};
connectionService.connectDatabase = connectDatabase;
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
