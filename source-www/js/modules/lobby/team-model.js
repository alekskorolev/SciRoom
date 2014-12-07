/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('teamModel', ['$rootScope', 'socketIO', '$location', '$q', function ($rootScope, io, $location, $q) {
			var TeamModel = function (attr, inList) {
				var priv = {
					attr: {},
					invite: function (user) {
					},
					save: function () {
						var deffered = $q.defer();
						io.send('lobby:newteam', priv.attr, function (data) {
							if (data.success) {
								deffered.resolve(data);
							} else {
								deffered.reject(data.error);
							}
						});
						return deffered.promise;
						// save team on server
					}
				};
				priv.attr = attr;
				var saved = inList || priv.save()
					.then(function(data) {
						priv.attr = data.team;
						console.log(data);
					});
				return {
					getAttr: function (key) {
						console.log(priv)
						if (key) return priv.attr[key];
						return {name: priv.attr.name, description: priv.attr.description, number: priv.attr._id, created: new Date(priv.attr.created)};
					},
					invite: function (user) {
						// send invite to the team
					},
					saved: saved,
					save: inList?undefined:function () {
						priv.save()
							.then(function(data) {
								//save result
							});
					}
				};
			}
			var collection = [];
			return {
				loadTeamList: function () {
					var deffered = $q.defer();
					io.send('lobby:fetchteams', {}, function (data) {
						console.log(data);
						if (data.success && data.teams) {
							var teamList = [];
							for (var i=0; i<data.teams.length; i++) {
								var team = new TeamModel(data.teams[i], true);
								team.attr = team.getAttr();
								teamList.push(team);
							}
/*							angular.forEach(data.list, function (teamData) {
								var team = new TeamModel(teamData, true);
								console.log(team);
								teamList.push(team);
							});*/
							deffered.resolve(teamList);
						} else {
							deffered.reject(data.error);
						}
					});
					return deffered.promise;
				},
				createNew: function (data) {
					// create new team
					return new TeamModel(data);
				},				
			}
		}]);
}