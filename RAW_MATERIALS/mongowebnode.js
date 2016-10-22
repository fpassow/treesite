var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';

tree = {};

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        getRootId(db, function(err, objid) {
            loadNode(db, objid, function(db, function(err, webNode) {
                tree = webNode;
            });
        });
    }
    db.close();
});

function getRootId(db, callback) {
    db.collection('nodes').findOne({name:''}, {_id:1}, function(err, response) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, response._id);
        }
    });
};

function loadNode(db, objid, callback) {
    db.collection('nodes').findOne({"_id": objid}, function(err, aNode) {
        if (err) {
            callback(err, null);
        } else {
            aNode.children = {};
            aNode.kids.forEach(function(anId) {
                GET nextNode   function(err, nextNode) {
                    if (err) {
                        callback(err, null);
                    } else {
                        aNode.children[nextNode.name] = nextNode;
                    }
                });
            });
        
    }
    



    callback(null, node);
}



g
