var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';

router.get('/get-data', (req, res) => {
    
  MongoClient.connect(url, {
    useUnifiedTopology: true
  } ,(err, client) =>{
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
   
    const collection = db.collection('users')
    collection.insertOne([
      {user1: 1, user2: 2, user3: 3}
    ], (err) => {
      if(err) console.error(err);
      console.log("Inserts successful");
      client.close()
    } )
  });
})


router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Puggly' });

});

router.post('/insert', (req, res) => {


})

router.post('/form', function(req, res, next) {
  let{firstname,lastname,email,birthday,psw,pswrepeat}=req.body 
  console.log(firstname,lastname,email,birthday,psw,pswrepeat);
  
  const user = {
    firstname, lastname, email, birthday, psw
  } 
  MongoClient.connect(url, {
    useUnifiedTopology: true
  } ,(err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
   
    const collection = db.collection('users')
    // collection.find({}).toArray( (err, docs) => {
    //   if(err) console.error(err);
      
    //   console.log("Found records:");
    //   console.log(docs);
      
      
    // })
    
    collection.insertOne(user, (err) => {
      if(err) console.error(err);
      console.log("Inserts successful");
      client.close()
    } )
  });
  res.render('profile')
});


router.get('/', function(req, res, next) {
  res.render('posts', { title: 'Puggly' });

});

router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Puggly' });

});

router.get('/', function(req, res, next) {
  res.render('logout', { title: 'Puggly' });

});

router.get('/', function(req, res, next) {
  res.render('help', { title: 'Puggly' });

});

router.get('/', function(req, res, next) {
  res.render('daccount', { title: 'Puggly' });

});

router.get('/', function(req, res, next) {
  res.render('error', { title: 'Puggly' });

});



module.exports = router;
