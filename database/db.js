var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/reactHooksExampleDB";

MongoClient.connect(url,
  function(err, db) {
  if (err) throw err;
  console.log("Database connected!");
  var dbo = db.db("reactHooksExampleDB");
  dbo.collection("Cities").insertOne({"name":"Banja Luka","marpopulation":180000}, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
  });
});