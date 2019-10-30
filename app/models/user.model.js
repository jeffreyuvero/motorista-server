const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	lastname: String,
	firstname: String, 
	middlename: String, 
	address: String,
	gender: String,
	emailAddress: String,
	contactNumber: String,
	image: String 
}, {
	timestamp: true
})

module.exports = mongoose.model('User', UserSchema)