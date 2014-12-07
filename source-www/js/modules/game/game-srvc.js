/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('gameSrvc', ['$rootScope', 'socketIO', '$location', 'userModel', '$q',
													function ($rootScope, io, $location, userModel, $q) {
			var GameSrvc = function () {
				var priv = {
					loadGameSource: function (deffered) {
						io.send('game:loadsource',{team: userModel.profile.startedGame}, function (data) {
							if (data.success) {
								deffered.resolve(data);
							} else {
								deffered.reject(data.error);
							}
						});						
					}
				};
				return {
					loadGameSource: function () {
						var deffered = $q.defer();
						console.log(userModel)
						if (!userModel.profile) {
							userModel.checkauth()
							.then(function() {
								priv.loadGameSource(deffered);
							});
						} else {
								priv.loadGameSource(deffered);
						}
						return deffered.promise;
					}
				};
			};
			var game = new GameSrvc();
			return game;
		}]);

};