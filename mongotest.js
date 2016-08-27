var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/treesite';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    db.collection('content').findOne(new mongodb.ObjectID('57baf94855e0b6f617a15ad7'), function (err, result) {
        if (err) {
            console.log('find err: ' + err);
        } else {
            console.dir(result);
        }
    });

    db.close();
  }
});
