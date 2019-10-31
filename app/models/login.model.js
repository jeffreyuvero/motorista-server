const mongoose = require('mongoose')

const LoginSchema = mongoose.Schema({
	username: String,
	password: String, 
	userID: String
}, {
	timestamp: true
})

module.exports = mongoose.model('Login', LoginSchema)