/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('teamModel', ['$rootScope', 'socketIO', '$location', '$q', 'userModel', function ($rootScope, io, $location, $q, userModel) {
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
					},
					startGame: function () {
						$rootScope.$broadcast('startgame',this);
						userModel.profile.startedGame = this;
						$location.path('/game');
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
						console.log(priv);
						if (key) return priv.attr[key];
						return {name: priv.attr.name, 
										description: priv.attr.description, 
										number: priv.attr._id, 
										created: new Date(priv.attr.created),
										members: priv.attr.members,
										owner: priv.attr.owner
									 };
					},
					invite: function (user) {
						// send invite to the team
					},
					saved: saved,
					save: inList?undefined:function () {
						var that = this;
						priv.save()
							.then(function(data) {
								io.on('lobby:teamcomplite:'+that.getAttr('_id'), function(){
									priv.startGame();
								});
							});
					},
					startGame: function () {
						priv.startGame();
					},
					join: inList?function () {
						console.log('loin');
						var that = this;
						var deffered = $q.defer();
						io.send('lobby:join', {id: this.getAttr('_id')}, function (data) {
							console.log(data);
							if (data.success) {
								io.on('lobby:teamcomplite:'+that.getAttr('_id'), function(){
									priv.startGame();
								});
								if (that.getAttr('members').length==4) {
									priv.startGame();
								}
								deffered.resolve(data);
							} else {
								deffered.reject(data.error);
							}
						});
						return deffered.promise;
					}:undefined,
					leave: function () {
						var that = this;
						var deffered = $q.defer();
						io.send('lobby:leave', {id: this.getAttr('_id')}, function (data) {
							console.log(data);
							deffered.resolve(data);
						});
						return deffered.promise;
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
								if (userModel.profile.id == team.attr.owner || (team.attr.members.length>0 &&
										team.attr.members.indexOf(userModel.profile.id)>-1)) {
											teamList.inTeam = true;
											teamList.invitedTeam = team;
											io.on('lobby:teamcomplite:'+team.getAttr('_id'), function(){
												team.startGame();
											});
											if (team.getAttr('members').length==4) {
												team.startGame();
											}
										}
							}
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