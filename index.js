var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';

//
var tree = getTree();

//Connect to DB
MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

        //Haz mongo, will serv.
        var express = require("express");
        var app = express();
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());

        //Serve static files
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
                        res.json(items.map(function(a) {return a._id.toString();}));
                    }
                });
            } catch (e) {
                res.status(500).send('Server error: ' + ee.toString());
            }
        });
        
        //TEMPORARY. DUMP ALL OBJECTS IN CONTENT COLLECTION
        app.get("/content/dump",function(req,res) {
            console.log("GET " + req.originalUrl);
            var crit = {};
            try {
                db.collection('content').find().toArray(function(err, items) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.write('<html><body>');
                        items.forEach(function(x) {
                            res.write(x._id.toString() + '<br>');
                            res.write(x.text + '<br><br>');
                        });
                        res.write('</body></html>');
                        res.end();
                    }
                });
            } catch (e) {
                res.status(500).send('Server error: ' + ee.toString());
            }
        });
        
        //Get nodes, given a path and depth.
        //Depth defaults to 1, the indicated node and its children
        app.get('/nodes*', function(req, res) {
            res.json(req.url.split('/').slice(2));
            res.json(req.body);
        });
        
        //Insert into content
        app.post('/content', function(req, res) {
            console.dir(req.body);
            insertContent(db, req.body.text, function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result.toString());
                }
            });
        });

        app.listen(80);
    }
    
});

//57baf94855e0b6f617a15ad7

//UTILS

//Insert a content object. Callback gets error or the new ObjectID instance
function insertContent(db, contentString, callback) {
    db.collection('content').insert({text:contentString}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.insertedIds[0]);
        }
    });
}

/*  nodeInfo has:
 *    text    For the content object
 *    path    Path throgh the current tree
 *    name    Name used in paths
 *    title   Display name
 */
function insertNode(db, nodeInfo, callback) {
    db.collection('content').insert({text:nodeInfo.text}, function (err, contentResult) {
        if (err) {
            callback(err, null);
        } else {
            var contentId = contentResult.insertedIds[0];
            db.collection('nodes').insert({name:nodeInfo.name, title:nodeInfo.title}, function (err, nodeResult) {
                if (err) {
                    callback(err, null);
                } else {
                    
                    var nodeId = result.insertedIds[0]
               
//ALSO FIND PARENT NODE AND SET ME AS CHILE
               
            callback(null, result.insertedIds[0]);
        }
    });
}

/////////////////////////////////////
// Start by loading the entire tree
/////////////////////////////////////

loadTree() {
    getNodeByName(db, '/', function(err, node) {
        if (err) {
            //We're doomed!
        } else {
            tree = node;
            loadKids(db, tree);
        }
    });
}

function loadKids(db, node) {
    node.kids = {};
    node.kidIDs.forEach(function(kidID) {
        getNodeByID(db, kidID, function(err, kidNode) {
            if (err) {
                //?????????????????????
            } else {
                node.kids[kidNode.name] = kidNode;
                loadKids(db, kidNode);
            }
        });
    });
}

function getNodeByName(db, name, callback)) {
    db.collection('nodes').findOne({name: name}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

function getNodeByID(db, id, callback) {
    db.collection('nodes').findOne({_id: id}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}







