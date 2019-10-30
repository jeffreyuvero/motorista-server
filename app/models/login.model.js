const mongoose = require('mongoose')

const LoginSchema = mongoose.Schema({
	username: String,
	password: String, 
	userID: String
}, {
	timestamp: false
})

module.exports = mongoose.model('Login', UserSchema)