module.exports = function (app) {
	var log = app.get('logger')('modules/lobby');
	var config = app.get('config');
	var orm = app.get('orm');
	var Users = app.get('model:user');
	// Create user scheme
	var teamSchema = new orm.Schema({
		name: String, 
		description: String,
		owner: String,
		members: [String],
		created: { type: Date, required: true, default: Date.now }
	});
	teamSchema.methods.joinMember = function(id, cb) {
		var inTeam = false;
		this.members.forEach(function (member) {
			if (member==id) inTeam = true;	
		});
		if (!inTeam) this.members.push(id);
		this.save(function (err) {
			cb(err, this);
		});
	};
	teamSchema.methods.leaveMember = function(id, cb) {
		// add member to team;
		this.save(function (err) {
			cb(err, this);
		});
	};
/*	teamSchema.pre('save', function (next) {
		var that = this;
		if (this.listmembers && this.listmembers.length>0) {
			var memb = [];
			this.members.forEach(function (member) {
				memb.push(orm.Types.ObjectId(member));
			});
			this.members = memb;
		}	
		log.debug(this);
		next();
	});*/
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