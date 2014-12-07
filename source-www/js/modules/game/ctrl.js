module.exports = function (angular) {
	angular.module('sciroom')
		.controller('gameCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'teamModel', '$filter', 'userModel', 'gameSrvc',
				function ($scope, $location, $rootScope, $routeParams, teamModel, $filter, userModel, gameSrvc) {
				angular.extend($scope, {
					createContext: function (context) {
						$scope.gamegeometry = [context.width(),context.height()];
						context.css({"min-height": context.height(), "min-width": context.width()});
						$scope.game = new Phaser.Game(context.width(), context.height(), Phaser.AUTO, 'gameContext', {
							preload:$scope.preloadGame,
							create:$scope.createGame,
							update:$scope.updateGame,
						}, true, Phaser.Physics.P2);
					},
					preloadGame: function () {
						angular.forEach($scope.gameData.gamespace.locations, function (location, key) {
							$scope.game.load.image('locationbg:'+key, location.img);
						});
						$scope.currentLocation = $scope.gameData.gamespace.locations[0]
						$scope.currentLocation.index = 0;
					},
					createGame: function () {
							var bg = $scope.game.add.sprite(0,0, 'locationbg:'+$scope.currentLocation.index);
							console.log(bg);
					},
					updateGame: function () {
					}
				});
				$scope.$on('$viewContentLoaded',
					function (event) {
						if (!$scope.game) {
							var context = $('#gameContext');
							console.log(gameSrvc);
							gameSrvc.loadGameSource()
								.then(function (data) {
									console.log(data);
									$scope.gameData = data.game;
									$scope.createContext(context);
								})
						}
					});
			}]);
}