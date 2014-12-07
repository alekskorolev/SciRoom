module.exports = function (app) {
	var log = app.get('logger')('modules/game');
	var Teams = app.get('model:team');
	var Games = app.get('model:game');
	var Users = app.get('model:user');
	var orm = app.get('orm');
	var game = {
			loadSource: function (req) {
				if (!req.session || !req.session.user || !req.session.user._id) return req.io.respond({success: false, error: 'user not authority'});
				Users.findById(req.session.user._id, function (err, user) {
					if (!err) user.getInvitedTeam(function(err, team){
						log.debug(err, team);
						team.getGame(function(data) {
							log.debug(data);
							req.session.room = game._id;
							req.session.save();
							req.io.join('game:'+data.game._id);
							req.io.respond({success: !err, game: data});
						});
					})
				})
/*					.findOne({'_id': req.data.team._id})
					.exec(function (err, team) {
						log.debug(err, team);
						req.io.respond({success: !err, team: team});
					});*/
				},
				moves: function (req) {
					if (!req.session.room) req.io.respond({success: false, msg: 'disconnect'});
					var coord = req.data.coords||[50,50];
					req.io.room('game:'+req.session.room).broadcast('playermove', {user: req.session._id, coord: coord});
/*					if (req.session.Timeout) clearInterval(req.session.Timeout);
					req.session.Timeout = setInterval(function () {
						req.io.room('game:'+req.session.room).broadcast('playerleave', {user: req.session._id, coord: coord});
					}, 1000);*/
				}
	}
	app.io.route('game:loadsource', game.loadSource);
	app.io.route('game:moves', game.moves);
}