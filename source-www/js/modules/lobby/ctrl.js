module.exports = function (angular) {
	angular.module('sciroom')
		.controller('lobbyCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'teamModel', '$filter',
				function ($scope, $location, $rootScope, $routeParams, teamModel, $filter) {
				angular.extend($scope, {
					newteam: {
						name: "",
						description: ""
					},
					teamlist: [],
					teamoffset: 0,
					createTeam: function () {
						var team = teamModel.createNew($scope.newteam);
						team.saved.then(function (data) {
							team.attr = team.getAttr();
							console.log(team.attr.created.getDay());
							$scope.teamlist.push(team);
							$scope.newteam.name = "";
							$scope.newteam.description = "";
							$scope.teamlist.inTeam = true;
							$scope.teamlist.invitedTeam = team;
							//$scope.teamlist = $filter('orderBy')($scope.teamlist, expression, reverse)
							console.log('created', data);
						})
					},
					leaveTeam: function () {
						$scope.teamlist.invitedTeam.leave()
							.then(function (data) {
								
							});
					}
				});
				$scope.$on('$viewContentLoaded',
					function (event) {
						$scope.teamlist = [];
						$scope.teamlist.inTeam = false;
						teamModel.loadTeamList()
							.then(function (teams) {
								console.log(teams);
								$.extend($scope.teamlist, teams);
							});
					});
			}]);
}