var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

           
    }
    db.close();
});

function getRoot(db, callback) {
    db.collection('nodes').findOne({name:''}, function(err, root) {
        if (err) callback(err, null);
        root.getChildren = function() {} //TODO!!!!!!!
        
    });
};

//////////////////////////////////////////////////////////////////////

tree = {};;

function getWebNode(db, path, callback) {
    if 
    
}




