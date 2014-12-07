module.exports = function (app) {
	var log = app.get('logger')('modules/lobby');
	var Teams = app.get('model:team');
	var orm = app.get('orm');
	var auth = {
		newTeam: function (req) {
			Teams.create({name: req.data.name, description: req.data.description, owner: req.session.user._id}, function (err, team) {
				log.debug(err, team);
				if (err) {
					req.io.respond({success: false, error: "error of team saved: "});
				} else {
					if (team) req.io.respond({success: true, msg: 'team is created', team: team});
/*					team.addOwner(req.session.user._id, function () {
						team.save(function (err, team) {
							log.debug(err, team);
							team.fetchMembers(function(err, members) {
								log.debug(members);
								if (team) req.io.respond({success: true, msg: 'team is created', team: team, members: members});									
							})
						});
					});*/
				}
			})
		},
		fetchTeams: function (req) {
			Teams.find()
				.exec(function (err, teams) {
					log.debug(err, teams);
					req.io.respond({success: true, msg: 'team is created', teams: teams});
				})
		},
		joinTeam: function (req) {
			Teams.findById(req.data.id)
				.exec(function (err, team) {
					team.joinMember(req.session.user._id, function (err) {
						if (team.members.length==4) {
							log.debug('start');
							app.io.broadcast('lobby:teamcomplite:'+team._id, {game: 'its new game'});
						}
						req.io.respond({success: !err, team: team});
					});
				});
		}
	}
	app.io.route('lobby:newteam', auth.newTeam);
	app.io.route('lobby:fetchteams', auth.fetchTeams);
	app.io.route('lobby:join', auth.joinTeam);
}