module.exports = function (app) {
	var log = app.get('logger')('modules/lobby');
	var Teams = app.get('model:team');
	var auth = {
		newTeam: function (req) {
			Teams.create({name: req.data.name, description: req.data.description}, function (err, team) {
				if (err) {
					req.io.respond({success: false, error: "error of team saved: "});
				} else {
					team.addOwner(req.session.user._id, function () {
						team.save(function (err, team) {
							team.fetchMembers(function(err, members) {
								log.debug(members);
								if (team) req.io.respond({success: true, msg: 'team is created', team: team, members: members});									
							})
						});
					});
				}
			})
			log.debug(req.data);
		}
	}
	app.io.route('lobby:newteam', auth.newTeam);
}