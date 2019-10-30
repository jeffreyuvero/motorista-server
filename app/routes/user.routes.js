module.exports = (app) => {
	const login = require('../controllers/login.controllers.js')

	app.post('/login/', login.login)
}