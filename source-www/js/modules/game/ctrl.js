module.exports = function (angular) {
	angular.module('sciroom')
		.controller('gameCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'teamModel', '$filter',
				function ($scope, $location, $rootScope, $routeParams, teamModel, $filter) {
				angular.extend($scope, {

				});
				$scope.$on('$viewContentLoaded',
					function (event) {

					});
			}]);
}