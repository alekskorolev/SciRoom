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
		if (this.members.length>3 || this.owner==id) return cb({msg: 'Always invited'});
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
	teamSchema.methods.getGame = function (cb) {
		log.debug(this);
		var members = [this.owner].push(this.members);
		app.get('model:game').create({
			name: this.name, 
			description: this.description,
			owner: this.owner,
			members: [this.owner, this.members[0],this.members[1],this.members[2],this.members[3]],
			team: this._id}, function (err, game) {
				if(err && err.existing) {
					game = err.existing;
				} else if (err) {
					return cb(false);
				} 
				game.fetchMembers(function(err, members) {
					log.debug(err, game);
					cb({game: game, 
							users: members,
						 	gamespace: {
								name: 'chemicalplants',
								description: 'Abandoned Chemical Plant',
								locations: [
									{img: 'assets/chemicalplants/firstloca.jpg', 
									 movecoords: [[0,100],[20,30],[80,30],[100,0]], 
									 quests: [{id: 0, text: "test quest", zones: [[20,30],[20,20],[30,20],[30,30]]}
													 ]
									}
								]
							}
						 });
				})
			});
	}
	var Teams = orm.model('Teams', teamSchema);

	app.set('model:team', Teams);
	app.set('schema:team', teamSchema);
}