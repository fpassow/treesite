var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';


var tree = {};

MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);


        
        
        
    }
});

/////////////////////////////////////
// Start by loading the entire tree
/////////////////////////////////////

//callback only has error param. No error means we're ready to serve.
loadTree(db, callback) {
    //Get the root node.
    getNodeByName(db, '/', function(err, node) {
        if (err) {
            callback(err);
        } else {
            tree = node;
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<,
        }
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


//callback only has err param. No err means the kids are now loaded.
function loadKids(db, node, callback) {
    node.kids = {};
    for (kidId in node.kidIDs) {
        
        
        
        
        
    }
    
    
    node.kidIDs.forEach(function(kidID) {
        getNodeByID(db, kidID, function(err, kidNode) {
            if (err) {
                callback(err);
            } else {
                node.kids[kidNode.name] = kidNode;
                loadKids(db, kidNode);
                
                
                
                
            }
        });
    });
}


//callback returns (err, null) or (nul, node).
function getNodeByID(db, id, callback) {
    db.collection('nodes').findOne({_id: id}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}







