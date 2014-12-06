module.exports = function (app) {
	var log = app.get('logger')('modules/auth');
	var config = app.get('config').wargaming;
	var Users = app.get('model:user');
	var auth = {
		session: function (req, res) {
			log.debug('Set session: ', req.session);
			req.session.updated = new Date().toString();
			res.send({session: 'updated'});
		},
		login: function (req) {
			log.debug('login user: ', req.data);
			req.io.respond({success: true});
		},
		register: function (req) {
			log.debug('register user: ', req.data);
			req.io.respond({success: true});
		},
		logout: function (req) {
			log.debug('logout user: ', req.data);
			req.io.respond({success: true});
		}
	}
	app.get('/auth/session', auth.session);	
	app.io.route('auth:login', auth.login);
	app.io.route('auth:logout', auth.logout);
	app.io.route('auth:register', auth.register);
}