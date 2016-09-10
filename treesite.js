var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';

//My "global"
var TREESITE = {};

console.log();
console.log('WARNING!!! WRITE-ABLE WEB SERVICE WITHOUT PASSWORD PROTECTION.');
console.log('SHUT DOWN WHEN DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log();
console.log('WARNING!!! WRITE-ABLE WEB SERVICE WITHOUT PASSWORD PROTECTION.');
console.log('SHUT DOWN WHEN DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log();

//Connect to DB
MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        
        //Load nodes into memory. Each node represents the location of a page within the site.
        loadNodes(db, function(err) {
            if (err) {
                console.log('Unable to load tree: ', err);
                console.log('Shutting down.');
                process.exit(1);
            } else {
                
                console.log('Hi!');
            }
        }); //loadNodes()
        
        
        //Haz mongo, will serv.
        var express = require("express");
        var app = express();
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        
        
        //Insert a page as a child of the request path. 
        //Expects POST with 'name' and 'text' params.
        app.post('/child', function(req, res) {
            console.dir(req.body);
            //TODO: VALIDATE
            addContent(db, req.body.text, function(err, id) {
                if (err) {
                    res.send(err);
                } else {
                    addNode(db, req.body.path, id, function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send('Page inserted.');
                        }
                    }); //addNode()
                }
            });//addContent
        });// app.post

        app.listen(80);
    }
}); //MongoClient.connect()


//Populate TREESITE.nodes. callback(err).
//Expects treesite database to contain a collection 'nodes' containing one object with 
//    a property named 'all_in_one'.
function loadNodes(db, callback) {
    db.collection('nodes').findOne({all_in_one:1}, function(err, obj) {
        if (err) {
            console.log('Unable to load in-memory tree from MongoDB:', err);
            console.log('Shutting down.');
            process.exit(1);
        } else {
            if (obj) {
                TREESITE.nodes = obj;
            } else {
                console.log('Tree object missing from database.');
                console.log('Shutting down.');
                process.exit(1);
            }
        }
    });//db.collection().findOne()
}

//Add an object to the content collection. callback(err, id)
function addContent(db, text, callback) {
    
}


// callback(err)
function addNode(db, path, id, callback) {
    //Add to in-memory object
    
    //Persist in-memory object
    
    
}