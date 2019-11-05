const Login = require('../models/login.model.js'); 
const jwt = require('jsonwebtoken');


const jwtKey = 'motorista_jwt_secret_key'
const jwtExpirySeconds = 300

exports.login = (req, res) => {
	const pub_token = req.headers.authorization.replace('Bearer ', '');

	if(pub_token){
		jwt.verify(pub_token, jwtKey, (err,decode) => {
			if(err){
				throw err; 
			}
		})
	}else{
		return res.status(500).send({
			message: "Some error occurred while adding data"
		})
	}

	const {username, password} = req.body

	Login.find({username: username, password: password})


	const token = jwt.sign({username} , jwtKey, {
		expiresIn: jwtExpirySeconds
	})

	res.status(200).send(token)

	res.cookie('token', token, {maxAge: jwtExpirySeconds * 1000})
	res.end()
}