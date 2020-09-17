var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');


router.post('/validate', validate);
router.post('/getDbCollections', getDbCollections);
router.post('/getdocuments', getdocuments);



module.exports = router;


async function validate(req, res) {
    params = req.body

    const db = mongojs(params.connection_string, [])

    db.on('error', function(err) {
        console.log('we had an error.', err.toString());
        var error = err.toString()

        res.send({ status: error });
        // resolve({status: "failed", message: "Failed to connect to the database", error: error})
      });




    // db.getCollectionNames(function (err, docs) {
    //     if (err) {
    //         console.log(err)
    //         res.send({ status: failed });
    //     } else {
    //         console.log(docs)
    //         if (docs.length > 0) {
    //             res.send({ status: 'success' });
    //         } else {
    //             res.send({ status: 'Failed' });
    //         }

    //     }

    // })

}


function getDbCollections(req, res) {
    params = req.body
    const db = mongojs(params.connection_string)
    db.getCollectionNames(function (err, docs) {
        if (err) {
            console.log(err)
            res.send({ status: failed });
        } else {
            if (docs.length > 0) {
                res.send({ status: 'success', collections: docs });
            } else {
                res.send({ status: 'Failed' });
            }

        }

    })
}

function getdocuments(req, res) {
    params = req.body
    console.log(params)

    collection = params.collection;
    console.log(collection)
    const db = mongojs(params.connection_string)
    db[collection].find({}).limit(10, (err, response) => {
        if (err) {
            res.send({ 'status': "failed" })
        } else {
            res.send({ status: 'success', documents: response });
        }

    })
}