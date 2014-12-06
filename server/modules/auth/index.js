var userModel = require('./userModel');
var accessModel = require('./accessModel');
var authController = require('./authCtrl');
module.exports = function (app) {
	var log = app.get('logger')('modules/auth');
	var config = app.get('config');
	log.trace('Auth module init start');
	if (config.mode!='production') app.get('/auth/test', function (req, res) {
		res.send('Auth work');
	});
	log.trace('Define user model');
	userModel(app);
	log.trace('Define access model');
	accessModel(app);
	log.trace('Define auth controller');
	authController(app);
}