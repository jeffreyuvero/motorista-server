const User = require('../models/user.model.js'); 
const Login = require('../models/login.model.js'); 
const Motorcycle = require('../models/motorcycle.model.js'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const jwtKey = 'motorista_jwt_secret_key'
const pub = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplZmZyZXl1dmVybyIsImlhdCI6MTU3Mjg0NTI4OSwiZXhwIjoxNTcyODQ1NTg5fQ.J53pvwz4dviqcDKWhrKDK3xXD0ojShNFEm5TcUSiAw8';
const jwtExpirySeconds = 300

exports.create = (req, res) => {

	if(!req.headers.authorization){
		return res.status(500).send({
			message: "Permission denied"
		})
	}

	const token = req.headers.authorization.replace('Bearer ', '');
	// req.headers.authorization.replace('Bearer ', '');

	if(token){
		jwt.verify(token, jwtKey, (err,decode) => {
			if(err){
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

	bcrypt.hash(req.body.password, 10, (err, hash) => {
		const user = new User({
		    lastname: req.body.lastname,
		    firstname: req.body.firstname, 
		    middlename: req.body.middlename, 
		    address: req.body.address,
		    gender: req.body.gender,
		    emailAddress: req.body.emailAddress,
		    contactNumber: req.body.contactNumber,
		    image: req.body.contactNumber,
		});


		user.save()
		.then(data => {
			const login = new Login({
			    username: req.body.username,
			    password: hash, 
			    userID: data._id
			});

			res.send(data)
			login.save()
			const motorcycles = req.body.motorcycle; 

			for(i = 0; i <= motorcycles.length; i++){
				const motorcycle = new Motorcycle({
					brand: motorcycles[i].brand,
					model: motorcycles[i].model,
					type: motorcycles[i].type,
					year: motorcycles[i].year,
					image:motorcycles[i].image,
					userID: data._id
				})
				motorcycle.save();
			}
			
		 }).catch(err => {
		 	res.status(500).send({
		 	    message: err.message || "Some error occurred while creating the User."
		 	});
		 })
	})

}


exports.findOne = (req, res) => {

	const token = req.headers.authorization.replace('Bearer ', '');

	if(token){
		jwt.verify(token, jwtKey, (err,decode) => {
			if(err){
				throw err;
			}
		})
	}else {
		return res.status(500).send({
			message: "Some error occured while getting data"
		})
	}


	if(!req.params.id){
		return res.status(500).send({
			message: "Missing Indentification"
		})
	}

	// let json = {}; 
	User.findById(req.params.id)
		.then(user => {
			Login.find({userID: req.params.id})
			.then(login => {
				Motorcycle.find({userID: req.params.id})
				.then(motorcycle => {
					res.status(200).json({user, login, motorcycle})
				}).catch(err => {
					res.status(500).send({
						message: "Error in retrieving login information"
					})
				})
			}).catch(err => {
				res.status(500).send({
					message: "Error in retrieving login information"
				})
			})
		}).catch(err => {
			res.status(500).send({
				message: "Error in retrieving user information"
			})
		})

}