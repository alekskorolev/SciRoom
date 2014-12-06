/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('teamModel', ['$rootScope', 'socketIO', '$location', '$q', function ($rootScope, io, $location, $q) {
			var TeamModel = function (attr) {
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
				var saved = priv.save()
					.then(function(data) {
						console.log(data)
						//save result
					});
				return {
					getAttr: function (key) {
						// get team attribute
					},
					invite: function (user) {
						// send invite to the team
					},
					saved: saved,
					save: function () {
						priv.save()
							.then(function(data) {
								//save result
							});
					}
				};
			}
			var collection = [];
			return {
				fetchAll: function () {
					// fetch all teams by server
				},
				createNew: function (data) {
					// create new team
					return new TeamModel(data);
				},				
			}
		}]);
}