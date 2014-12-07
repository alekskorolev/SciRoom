var gameModel = require('./gameModel');
var gameController = require('./gameCtrl');
module.exports = function (app) {
	var log = app.get('logger')('modules/game');
	var config = app.get('config');
	log.trace('Game module init start');
	log.trace('Define game model');
	gameModel(app);
	log.trace('Define game controller');
	gameController(app);
}