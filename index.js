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
        app.get("/content/id/:content_id",function(req,res){
            console.log("GET " + req.originalUrl);
            try {
                var objid = new mongodb.ObjectID(req.params.content_id);
                try {
                    db.collection('content').findOne({_id: objid}, function (err, result) {
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
                    }); 
                } catch (ee) {
                    res.status(500).send('Server error: ' + ee.toString());
                }
                
            } catch (e) {
                res.status(400).send('400: Invalid ID format');
            }
        });
        
        //Search the "content" collection and return id's of matching objects as a JSON array.
        //If no search params, return id's of all objects.
        //FOR NOW, ONLY DOES LIST-ALL. ADD TEXT SEARCH AFTER LEARNING ABOUT TEXT INDEXING IN MONGODB.
        app.get("/content/find",function(req,res) {
            console.log("GET " + req.originalUrl);
            var crit = {};
            try {
                db.collection('content').find({}, {_id:1}).toArray(function(err, items) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.json(items);
                    }
                
                });
            } catch (e) {
                res.status(500).send('Server error: ' + ee.toString());
            }
        });
        

        app.listen(80);
    }
    
});

//57baf94855e0b6f617a15ad7


