const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    googleId: String,
    imageUrl: String,
})

module.exports = mongoose.model('User', userSchema)