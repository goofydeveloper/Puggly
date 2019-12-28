var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Puggly' });

});

router.post('/form', function(req, res, next) {
  let{firstname,lastname,email,birthday,psw,pswrepeat}=req.body 
  console.log(firstname,lastname,email,birthday,psw,pswrepeat);
  
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
