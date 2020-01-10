var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("./auth");
const axios = require('axios')
var globalToken = "";

// const login = async () => {
//   const config = {
//     headers: {
//       'x-auth-token': token
//     }
//   }
//   try {
//     await axios.post('/profile', null, config)
//   } catch (err) {
//     console.error(err);
//     console.log(token);
    
    
//   }
// } 

// GET SECTION

// GET SIGN UP PAGE :)
router.get("/", (req, res) => {
  res.render("signup", { title: "Puggly" });
});

// GET MY PROFILE PAGE :)
router.get("/profile", async (req, res) => {
  console.log("Here?");
  
  if(!globalToken) {
    res.redirect("/")
  }
  try {
    // Get user object

    user = await User.findOne({ _id: req.user.id });

    res.render("profile", { title: "Puggly", user: user });
    //res.render('profile', { title: 'Puggly' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
});

// GET MY OTHER USER POSTS :)
router.get("/allposts", auth, async (req, res) => {
  //
  try {
    // Get users
    users = await User.find({});

    res.render("allposts", { title: "Puggly", users: users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
});
;

// LOGOUT / DELETE JWT ?
router.get("/logout", auth, (req, res) => {
  req.user.id = null;

  res.redirect("/");
});

// POST SECTION

// POST FORM FOR USER CREATION :)
router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, birthday, password } = req.body;

  try {
    // Find user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Create User
    user = new User({
      first_name, last_name, email, birthday, password
    });

    
    await user.save();

    // console.log(user.id);
    
    // add user_id to jwt payload
    const payload = {
      user: {
        id: user.id
        //id: "hello"
      }
    };
    // const payload2 = {
    //   user: {
    //     id: "hello"
    //   }
    // }
    // console.log("this is the payload: ",payload);
    // console.log("comparison: ", payload2);
    
    //create jsonwebtoken for authentication
    await jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600000 },
       (err, token) => {
        if (err) throw err
       
        globalToken = token
        console.log(globalToken);
        
        // res.json({ token: token });

      }
    )
    res.json({globalToken})

  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// POST FORM TO ADD POST TO USER (W/ AUTH PROTECTION) :)
router.post("/addposts", auth, async (req, res) => {
  const { text } = req.body;
  console.log(text);
  const post = {
    text
  };

  try {
    // Find user
    user = await User.findById({ _id: req.user.id });
    user.posts.push(post);
    await user.save();
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error", err.message, req.body);
  }
});

// DELETE SECTION

// DELETE USER ACCOUNT :)
router.delete("/delete", auth, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET ERROR PAGE :)
router.get("/*", function(req, res, next) {
  res.render("error", { title: "Puggly" });
})

module.exports = router;