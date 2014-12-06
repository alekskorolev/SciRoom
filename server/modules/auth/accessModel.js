module.exports = function (app) {
	var log = app.get('logger')('modules/auth');
	var config = app.get('config');
	var orm = app.get('orm');
	// Create user scheme
	var accessSchema = new orm.Schema({
		route: String,
		role: String,
		write: Boolean
	});
	accessSchema.set('redisCache', true);
	accessSchema.set('expires', 7*24*3600);
	// Create User model
	var Access = orm.model('Access', accessSchema);
	app.set('model:access', Access);
	app.set('schema:access', accessSchema);
}