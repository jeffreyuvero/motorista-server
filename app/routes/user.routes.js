module.exports = (app) => {
	const user = require('../controllers/user.controllers.js')

	app.post('/login/', user.login)
}