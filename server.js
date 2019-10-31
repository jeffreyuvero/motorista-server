const express = require('express')
const bodyParser = require('body-parser')

const app = express(); 


// database 
const dbConfig = require('./app/config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()); 

app.get('/', (req,res) => {
	res.json({"message": "Let's Get Started! "})
})

app.listen(5000, () => {
	console.log("Server is listening on port 5000")
})


require('./app/routes/user.routes.js')(app);