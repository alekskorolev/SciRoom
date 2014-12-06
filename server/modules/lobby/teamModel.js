module.exports = function (app) {
	var log = app.get('logger')('modules/lobby');
	var config = app.get('config');
	var orm = app.get('orm');
	var Users = app.get('model:user');
	// Create user scheme
	var teamSchema = new orm.Schema({
		name: String, 
		description: String,
		members: [orm.Types.ObjectId]
	});
	teamSchema.methods.addOwner = function(id, cb) {
		this.members[0] = orm.Types.ObjectId(id);
		cb(this);
	};
	teamSchema.methods.fetchMembers = function (cb) {
		log.debug(this);
		Users
			.find({})
			.where('_id').in(this.members)
			.exec(cb);
	}
	Teams = orm.model('Teams', teamSchema);

	app.set('model:team', Teams);
	app.set('schema:team', teamSchema);
}