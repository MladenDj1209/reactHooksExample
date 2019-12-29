const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors');
const fetch = require("node-fetch");
// const intialData = require('./database/initialData');

// var mongo = require('mongodb')
// var MongoClient = require('mongodb').MongoClient;

// var url = "mongodb://localhost:27017/reactHooksExampleDB";

// MongoClient.connect(url,
//   function(err, db) {
//   if (err) throw err;
//   console.log("Database connected!");
//   var dbo = db.db("reactHooksExampleDB");
//   dbo.collection("Cities").insertMany(intialData, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//   });
// });

app.use(cors());

app.use('/api/v1/', require('./services/api'))

app.use( (err, req, res, next) => {
  res.send(err.message);
})

app.listen(4000)

