var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';

MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

        //Haz mongo, will serv.
        var express = require("express");
        var app = express();

        //Serve files
        app.use('/public', express.static('public'));

        //Serve objects from the mongodb "content" collection by _id.
        //Rooted at "/content".
        app.get("/content/:content_id",function(req,res){
            try {
                var objid = new mongodb.ObjectID(req.params.content_id);
                
                db.collection('content').findOne(), function (err, result) {
                    if (err) {
                        console.log('find err: ' + err);
                        //SEND 500
                    } else {
                        if (result && result.text) {
                            res.send(result.text);
                        } else {
                            res.status(404).send('404: Not found');
                        }
                    }
                }; 
                
            } catch (e) {
                //TODO: DISTINGUISH DB ACCESS ERROR
                res.status(400).send('400: Invalid ID format');
            }
        });

        app.listen(80);
    }
    
});

//57baf94855e0b6f617a15ad7


