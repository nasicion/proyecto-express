var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/tasks';

var db = null;

module.exports.init = function(callback){
    MongoClient.connect(url, function(err, db){
        if(!err){
            console.log('mongodb connected');
        }
        module.exports.db = db;
        this.db = db;
        callback(err);
    });
};


module.exports.getDb = function() {
  return this.db;
}