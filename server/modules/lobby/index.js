var teamModel = require('./teamModel');
var lobbyController = require('./lobbyCtrl');
module.exports = function (app) {
	var log = app.get('logger')('modules/lobby');
	var config = app.get('config');
	log.trace('Lobby module init start');
	log.trace('Define team model');
	teamModel(app);
	log.trace('Define team controller');
	lobbyController(app);
}