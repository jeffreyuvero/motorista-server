const User = require('../models/user.model.js'); 
const jwt = require('jsonwebtoken');


const jwtKey = 'motorista_jwt_secret_key'
const jwtExpirySeconds = 300

export.login = (req, res) => {
	const {username, password} = req.body
	const token = jwt.sign({username} , jwtKey, {
		expiresIn: jwtExpirySeconds
	})

	console.log('token', token)

	res.cookie('token', token, {maxAge: jwtExpirySeconds * 1000})
	res.end()
}