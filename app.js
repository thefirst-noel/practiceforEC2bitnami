var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Cdb = null;
MongoClient.connect('mongodb://localhost:27017/manavDB', function(err, db) {
  if (err) {
    throw err;
  }
  Cdb=db;
  
 db.collection('tempCol').find().toArray(function(err, results) {
     if (err) {
    throw err;
  }
       console.log(results);
  // send HTML file populated with quotes here
});
    
    
//  db.collection('programs').find().toArray(function(err, results) {
//     if (err) {
//    throw err;
//  }
//    console.log(results);
//  // send HTML file populated with quotes here
//});

    
//static data 
    
    
    
    
    
});
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  next();
});
// Define the port to run on
app.set('port', 3010);
app.use(express.static(path.join(__dirname, '/dist')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Mongodb

//Post registration data
app.post('/register', function(req,res){
  console.log(req.body);
  Cdb.collection('users').save(req.body,function(error, result){
  res.send(result);
}
    )});





// respond with list of housing programs when a GET request is made to /housing
app.get('/housing', function(req, res) {
  Cdb.collection('programs').find({'category':'Housing'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});

// respond with list of health programs when a GET request is made to /health
app.get('/health', function(req, res) {
  Cdb.collection('programs').find({'category':'Health'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});

// respond with list of Education programs when a GET request is made to /education
app.get('/education', function(req, res) {
  Cdb.collection('programs').find({'category':'Education'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});

// respond with list of employment programs when a GET request is made to /employment
app.get('/employment', function(req, res) {
  Cdb.collection('programs').find({'category':'Employment'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});

// respond with list of income programs when a GET request is made to /income
app.get('/income', function(req, res) {
  Cdb.collection('programs').find({'category':'Income'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});

// respond with list of food programs when a GET request is made to /food
app.get('/food', function(req, res) {
  Cdb.collection('programs').find({'category':'Food'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});

// respond with list of others programs when a GET request is made to /others
app.get('/others', function(req, res) {
  Cdb.collection('programs').find({'category':'Others'}).toArray(function(err, results) {
     if (err) {
    throw err;
  }
       //console.log(results);
    res.send(results);
  
});
  
});


// fetching all programs from the database
app.get('/allPrograms', function(req, res) {
    Cdb.collection('programs').find({}).toArray(function(err, results) {
        if (err) {
            throw err;
        }
        //console.log(results);
        res.send(results);

    });

});

// adding a new program
app.post('/addProgram', function(req, res){
    console.log("request body");
    console.log(req.body);
    // Cdb.collection('programs').save(req.body,function(error, result){
    //         res.send(result);
    //     }
    // );
    Cdb.collection('programs').save(
        {
            'title':req.body.title,
            'details':req.body.detail,
            'phone':req.body.phone,
            'category':req.body.category,
        });
});


//Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Service started ' + port);
});

// fetching programs using search string from the database
app.post('/search', function(req, res) {
    console.log('Search String: '+req.body.searchString);
    Cdb.collection('programs').find({$text:{$search: req.body.searchString}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}}).toArray(function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send(results);
        
    });

});
//db.programs.find({$text:{$search: "gang problems"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})