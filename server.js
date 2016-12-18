
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'myDb.db', autoload: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use(express.static('public'));

//@POST
app.post('/user', function (req, res) {

  var doc = req.body;
  console.log(doc)
  db.insert(doc, function (err, newDoc) {   
  	console.log(newDoc)
  });

  res.send({dasd: []})
});

//@GET
app.get('/user', function (req, res) {

  db.find({}, function(err, docs) {
    res.send(docs);
  })

});

//@DELETE
app.delete('/user', function (req, res) {
  
  var doc = req.body;
  console.log('server.js ', doc);
  //res.send(doc);

  db.remove(doc, {}, function (err, docs) {
    res.send('deleted');
  });

});







app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


