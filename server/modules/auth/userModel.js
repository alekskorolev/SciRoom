var bcrypt = require('bcrypt');
module.exports = function (app) {
	var log = app.get('logger')('modules/auth');
	var config = app.get('config');
	var orm = app.get('orm');
	var model = {Users: {}};
	// Create user scheme
	var userSchema = new orm.Schema({
		login: String,
		password: {type: String, select: false},
		_pass: {
			isNew: Boolean,
			value: {type: String}
		},
		roles: [String]
	});
	// Crypt password if change
	userSchema.pre('save', function (next) {
		var that = this;
		if (this._pass.isNew) {
			log.debug('Change user password');
			var salt = bcrypt.genSaltSync(10);                                                                                                                                     
        bcrypt.hash(this._pass.value, salt, function (err, hash) {
					if (err) return next(err);
					console.log(that); 
					that.password  = hash;
					that._pass.isNew = false;
					that._pass.value = "";
					console.log(that);
					next();
				});
				
		} else {
			next();
		}
		
	});
	// Compare password
	userSchema.methods.comparePassword = function(candidatePassword, cb) {
		log.debug('Begin compare password', candidatePassword);
			console.log(this);
			model.Users.findOne({ login: this.login }).select("+password").exec(function (err, user) {    
				console.log(user);
        if(user) { 		
					bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
						log.debug(err, isMatch)
						if (err) {
							log.warn('Password is incorrect');
							cb(err);
						} else {
							log.debug('password correct');
							cb(null, isMatch);
						}

					});
        } else {
        	cb(err);
        }
	    });
	};
	// Create User model
	model.Users = orm.model('Users', userSchema);
	// Check new user on exist
	userSchema.pre('save', function(next) {
		if (this.isNew) {
			log.debug('Save new user: ' + this.login);
	    model.Users.findOne({ login: this.login }, function (err, user) {                                                                                                
        if(user) { 
        	log.warn('User "' + user.login +'" already exist');
        	var err = new Error('USER_ALREADY_EXIST');
        	next(err); 
        } else {
        	next();
        }
	    });			
		} else {
			next();
		}                                                                                                                                                                  
	});
	app.set('model:user', model.Users);
	app.set('schema:user', userSchema);
}