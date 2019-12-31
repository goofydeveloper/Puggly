const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    _id: {
        required: false
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [PostSchema]
  
})

module.exports = User = mongoose.model('user', UserSchema);
