var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const auth = require('./auth')



// GET SECTION

// GET SIGN UP PAGE :)
router.get('/', (req, res) => {
  res.render('signup', { title: 'Puggly' });

});

// GET MY PROFILE PAGE :)
router.get('/profile', auth, async(req, res) => {

  // 
  try {
    // Get user object
    
    user = await User.findOne({_id: req.user.id})    
    
    res.render('profile', {title: 'Puggly', user: user})
    //res.render('profile', { title: 'Puggly' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: 'Server error'})
  }

});

// GET MY OTHER USER POSTS :)
router.get('/allposts', auth, async(req, res) => {

  // 
  try {
    // Get users    
    users = await User.find({})    
    
    res.render('allposts', {title: 'Puggly', users: users})

  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: 'Server error'})
  }

});
// GET ERROR PAGE :)
router.get('/*', function(req, res, next) {
  res.render('error', { title: 'Puggly' });
});

// LOGOUT / DELETE JWT ?
router.get('/logout', auth,  (req, res) => {
  req.user.id = null;

  res.redirect('/')

});

// POST SECTION

// POST FORM FOR USER CREATION :)
router.post('/signup', async(req, res) => {
  const {first_name,last_name,email,birthday,password}=req.body 
 
  try {

    // Find user
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ errors: [{msg: 'User already exists' }]})
    }
    
    // Create User
    user = new User({
      first_name,last_name,email, birthday, password
    })

    await user.save()

    const payload = {
      user: {
          id: user.id                
      }
  }

  //create jsonwebtoken for authentication
  jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600000 }, (err, token) => { 
      if(err) throw err;
      res.json({token})
  }) 

  // Redirect to /profile!!
  // res.redirect('profile')

  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
    
  }
  
});



// POST FORM TO ADD POST TO USER (W/ AUTH PROTECTION) :)
router.post('/addpost', auth, async (req, res) => {
  
  
  const {text}  = req.body
  console.log(text);
  const post = {
    text
  }
  
  try {
    // Find user
    user = await User.findById({_id: req.user.id})
    user.posts.push(post) 
    await user.save()
    return res.json(user)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error', err.message, req.body)

  }
 
})

// DELETE SECTION

// DELETE USER ACCOUNT :)
router.delete("/delete", auth, async(req, res) =>{
  try {
    await User.findOneAndRemove({_id: req.user.id})
    return res.json({msg: 'User deleted'})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')

  }
})




module.exports = router;
