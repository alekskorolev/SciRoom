var bcrypt = require('bcrypt');
module.exports = function (app) {
	var log = app.get('logger')('modules/auth');
	var config = app.get('config');
	var orm = app.get('orm');
	// Create user scheme
	var userSchema = new orm.Schema({
		login: String,
		password: {type: String, select: false},
		_pass: {
			isNew: Boolean,
			value: {type: String, select: false}
		},
		roles: [String]
	});
	// Crypt password if change
	userSchema.pre('save', function (next) {
		if (this._pass.isNew) {
			log.debug('Change user password');
			var salt = bcrypt.genSaltSync(10);                                                                                                                                     
        this.password  = bcrypt.hashSync(this._pass.value, salt);
		}
		next();
	});
	// Compare password
	userSchema.methods.comparePassword = function(candidatePassword, cb) {
		log.debug('Begin compare password');
	    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
        	log.warn('Password is incorrect');
        	cb(err);
        } else {
        	log.debug('password correct');
        	cb(null, isMatch);
        }
	        
	    });
	};
	// Create User model
	var Users = orm.model('Users', userSchema);
	// Check new user on exist
	userSchema.pre('save', function(next) {
		if (this.isNew) {
			log.debug('Save new user: ' + this.login);
	    Users.findOne({ login: this.login }, function (err, user) {                                                                                                
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
	app.set('model:user', Users);
	app.set('schema:user', userSchema);
}