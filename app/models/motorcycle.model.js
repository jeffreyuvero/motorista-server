const mongoose = require('mongoose')

const MotorcycleSchema = mongoose.Schema({
	brand: String,
	model: String, 
	type: String, 
	year: String,
	image: String,
	userID: String
}, {
	timestamp: true
})

module.exports = mongoose.model('motorcycle', MotorcycleSchema)