const User = require('../models/user.model.js'); 
const Login = require('../models/login.model.js'); 
const jwt = require('jsonwebtoken');


const jwtKey = 'motorista_jwt_secret_key'
const pub = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplZmZyZXl1dmVybyIsImlhdCI6MTU3Mjg0NTI4OSwiZXhwIjoxNTcyODQ1NTg5fQ.J53pvwz4dviqcDKWhrKDK3xXD0ojShNFEm5TcUSiAw8';
const jwtExpirySeconds = 300

exports.create = (req, res) => {

	const token = req.headers.authorization.replace('Bearer ', '');
	// req.headers.authorization.replace('Bearer ', '');

	if(token){
		jwt.verify(token, jwtKey, (err,decode) => {
			if(err){
				console.log('in_err')
				throw err; 
			}
		})
	}else{
		return res.status(500).send({
			message: "Some error occurred while adding data"
		})
	}


	if(!req.body) {
		return res.status(400).send({
            message: "Information can not be empty"
        });
	}

	
	const user = new User({
	    lastname: req.body.lastname,
	    firstname: req.body.firstname, 
	    middlename: req.body.middlename, 
	    address: req.body.address,
	    gender: req.body.gender,
	    emailAddress: req.body.emailAddress,
	    contactNumber: req.body.contactNumber,
	});

	

	user.save()
	.then(data => {
	 	const login = new Login({
	 	    username: req.body.username,
	 	    password: req.body.password, 
	 	    userID: data._id
	 	});

	 	res.send(data)
	 	login.save()
	 }).catch(err => {
	 	res.status(500).send({
	 	    message: err.message || "Some error occurred while creating the User."
	 	});
	 })
}