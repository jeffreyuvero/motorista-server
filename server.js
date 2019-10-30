const express = require('express')
const bodyParser = require('body-parser')

const app = express(); 

app.get('/', (req,res) => {
	res.json({"message": "Let's Get Started! "})
})

app.listen(5000, () => {
	console.log("Server is listening on port 5000")
})