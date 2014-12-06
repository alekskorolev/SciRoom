module.exports = function (app) {
	var log = app.get('logger')('modules/auth');
	var config = app.get('config').wargaming;
	var Users = app.get('model:user');
	var auth = {
		session: function (req, res) {
			log.debug('Set session: ', req.session);
			req.session.updated = new Date().toString();
			if (req.session.user) {
				res.send({session: 'updated', user: req.session.user});
			} else {
				res.send({session: 'updated'});
			}
		},
		checkAuth: function (req) {
			log.debug('Check session: ', req.session);
			if (req.session.user) {
				req.io.respond({auth: true, user: req.session.user});
			} else {
				req.io.respond({auth: false});
			}			
		},
		login: function (req) {
			Users.findOne({login: req.data.login},function (err, _user) {
				if (err) {
						log.warn(req.sessionID, ": error of user find ", err); 
						req.io.respond({success: false, error: 'undefined server error'});
					} else if (_user) {
						_user.comparePassword(req.data.password, function (err, isMatch) {
							if (err || !isMatch) {
								req.io.respond({success: false, error: 'server error or wrong password'});
							} else {
								req.session.user = _user;
								req.session.save();
								req.io.respond({success: true, msg: 'user is auth', user: _user});
							}
						});
					} else {
						Users.create({login: req.data.login, _pass: {isNew: true, value: req.data.password}}, function (err, user) {
							if (err) {
								req.io.respond({success: false, error: "error of user saved: "});
							} else {
								req.session.user = user;
								req.session.save();
								req.io.respond({success: true, msg: 'user is auth', user: user});
							}
						})
					}
			});
			
		},
		logout: function (req) {
			req.session.user = false;
			req.session.save();
			req.io.respond({success: true});
		}
	}
	app.get('/auth/session', auth.session);	
	app.io.route('auth:login', auth.login);
	app.io.route('auth:logout', auth.logout);
	app.io.route('auth:check', auth.checkAuth);
}