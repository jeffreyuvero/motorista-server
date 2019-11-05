module.exports = (app) => {
	const login = require('../controllers/login.controller.js')
	const user = require('../controllers/user.controller.js')

	app.post('/login/', login.login)
	app.post('/user/', user.create)
	app.get('/user/:id', user.findOne)
}

