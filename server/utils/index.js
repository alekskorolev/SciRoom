var logger = require('./logger'),
cors = require('./cors');;
module.exports = {
	Log: function (level) {
		return logger(level);
	},
	Cors: cors
}