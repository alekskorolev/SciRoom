module.exports = function (app) {
	var log = app.get('logger')('modules/game');
	var config = app.get('config');
	var orm = app.get('orm');
	var Users = app.get('model:user');
	var Teams = app.get('model:team');
	// Create user scheme
	var gameSchema = new orm.Schema({
		name: String, 
		description: String,
		owner: String,
		members: [String],
		team: String,
		created: { type: Date, required: true, default: Date.now }
	});
	gameSchema.methods.joinMember = function(id, cb) {
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
	gameSchema.methods.leaveMember = function(id, cb) {
		// add member to team;
		this.save(function (err) {
			cb(err, this);
		});
	};
	gameSchema.methods.fetchMembers = function (cb) {
		log.debug(this);
		Users
			.find({})
			.where('_id').in(this.members)
			.exec(cb);
	}
	var Games = orm.model('Games', gameSchema);
	gameSchema.pre('save', function(next) {
		if (this.isNew) {
			log.debug('Create new game: ' + this.team);
	    Games.findOne({ team: this.team }, function (err, game) {                                                                                                
        if(game) { 
        	log.warn('Game for team "' + game.team +'" already exist');
        	var err = new Error('USER_ALREADY_EXIST');
					err.existing = game;
        	next(err); 
        } else {
        	next();
        }
	    });			
		} else {
			next();
		}                                                                                                                                                                  
	});
	app.set('model:game', Games);
	app.set('schema:game', gameSchema);
}