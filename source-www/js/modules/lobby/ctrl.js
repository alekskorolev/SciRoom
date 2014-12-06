module.exports = function (angular) {
  angular.module('sciroom')
    .controller('lobbyCtrl',['$scope', '$location', '$rootScope', '$routeParams', 'teamModel', function ($scope, $location, $rootScope, $routeParams, teamModel) {
      angular.extend($scope, {
				newteam: {
					name: "",
					description: ""
				},
				createTeam: function () {
					var team = teamModel.createNew($scope.newteam);
					team.saved.then(function (data) {
						console.log(data);
					})
				}
      });
    }]);
}