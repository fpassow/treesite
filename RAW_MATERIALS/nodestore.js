var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';


var root = {};

function loadTree() {
    
}();

function getNodes(db, path, callback) {
    path = path.trim().split('/');
    if (!path[0]) path.shift();j //remove empty string created by a leading slash.
    var name = path.shift();
    while (path.length)
    
    
    
    
}



MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        insertContent(db, 'blah blah blah', function(err, objid) {
            if (err) {
                console.log('error: ' + err.toString());
            } else {
                console.log(objid.toString());
            }
        });
    }
    db.close();
});

//Insert a content object. Callback gets error or the new ObjectID
function insertContent(db, contentString, callback) {
    db.collection('content').insert({text:contentString}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.insertedIds[0]);
        }
    });
}