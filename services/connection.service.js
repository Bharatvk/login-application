
var mongojs = require('mongojs');
var connectionService = {};
connectionService.connectDatabase = connectDatabase;
connectionService.getDbCollections = getDbCollections;
connectionService.getdocuments = getdocuments;
connectionService.constructQuery =constructQuery;
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
    console.log("getdocuments",params)
    try{

    var collection = params.collection;
   var query =  constructQuery(params);
    // ,filter,projection,skip,limit
    return new Promise(function(resolve, reject) {
    const db = mongojs(params.connection_string);

    db.on('error', function(err) {
        console.log('we had an error.', err.toString());
        var error = err.toString()
        resolve({status: "failed", message: "Failed to connect to the database", error: error})
      });

    db[collection].find(query.find,query.projection).sort().skip(query.skip).limit(query.limit, (err, response) => {
        if (err) {
            console.log("err---", err);
            resolve({status: "failed", message: "Failed to connect to the database", error: err})
        } else {
            console.log("response---", response);
        resolve({status: "success", message: "Documents fetched succesfully", documents: response});
            
        }

    })
});

}catch(err){
    console.log("err----", err);
}
}

function constructQuery(params){
    var skip = (params.skip!=null)?parseInt(params.skip):0;

    var limit = (params.limit!=null)?parseInt(params.limit):20;
    var find = {};
        if(params.find_query!= null){
        // params.find_query= params.find_query.replace("ObjectId", "mongojs.ObjectId");
        var multipleQuery = params.find_query.split(",");
        for(var i = 0; i < multipleQuery.length; i++){
            var findArray =  multipleQuery[i].split(":");
            console.log("findArray--",findArray );
            if(findArray.length == 2){
               
                    findArray[0]=  findArray[0].replace(/{/g, '');
                    findArray[0]=  findArray[0].replace(/"/g, '').trim();
                    findArray[1] = findArray[1].replace(/\)/g, '');
                    findArray[1]=  findArray[1].replace(/}/g, '');
                    findArray[1] = findArray[1].replace(/ObjectId\(/g, '');
                    findArray[1]=  findArray[1].replace(/"/g, '').trim();
                    // findArray[i] = findArray[i].toString();
                    console.log("find Array--=", findArray);
                    if(params.find_query.includes("ObjectId")){
                    find[findArray[0].toString()] = mongojs.ObjectId(findArray[1]);
                    } else {
                    find[findArray[0].toString()] =findArray[1];
                    }
                // console.log("find array fina;--", findArray);
            }
        }
    }
        console.log("find obj==", find);
       
    // else {
    //     console.log("params find query--", params.find_query);
    //     var findArray =  params.find_query.split(":");
    //     if(findArray.length == 2){

    //     }
    //     // find = (params.find_query!=null)?JSON.parse(params.find_query):{};
    // }


//    var projection = (params.projection!=null)?JSON.parse(params.projection):{};
    var projection = {};
    if(params.projection){
        var multipleQuery = params.projection.split(",");
        for(var i = 0; i < multipleQuery.length; i++){
    var projectionArray =  multipleQuery[i].split(":");
    if(projectionArray.length == 2){
        projectionArray[0]=  projectionArray[0].replace(/{/g, '');
        projectionArray[0]=  projectionArray[0].replace(/"/g, '').trim();
        projectionArray[1] = projectionArray[1].replace(/\)/g, '');
        projectionArray[1]=  projectionArray[1].replace(/}/g, '');
        projectionArray[1] = projectionArray[1].replace(/ObjectId\(/g, '');
        projectionArray[1]=  projectionArray[1].replace(/"/g, '').trim();
        console.log("projectionArray[1]--", projectionArray[1]);
        projection[projectionArray[0].toString()] = parseInt(projectionArray[1]);
    }    
}
}
    console.log("projection...", projection);

    // var sort = (params.sort!=null)?JSON.parse(params.sort):{};
    console.log("find queru===", find)
    var final_query = {
        find: find,
        projection: projection,
        skip : skip,
        limit: limit
    }
    return final_query;
}