var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
//var Cdb = null;
// MongoClient.connect('mongodb://localhost:27017/manavDB', function(err, db) {
//   if (err) {
//     throw err;
//   }
//   Cdb=db;
//
//  db.collection('tempCol').find().toArray(function(err, results) {
//      if (err) {
//     throw err;
//   }
//        console.log(results);
//   // send HTML file populated with quotes here
// });
//
//
// });
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  next();
});
// Define the port to run on
app.set('port', 3010);
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/hello', function(req, res) {
  res.send("Hello!")

});

//Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Service started ' + port);
});
