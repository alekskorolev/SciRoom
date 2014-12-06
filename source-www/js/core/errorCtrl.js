module.exports = function (angular) {
  angular.module('sciroom')
    .controller('errorCtrl',['$scope', '$location', '$rootScope', '$routeParams', function ($scope, $location, $rootScope, $routeParams) {
      angular.extend($scope, {
				code: $routeParams.id || '404'
      });
			$scope.$watch('$viewContentLoaded', function () {
				$scope.$emit('header:title', {title: 'Error ' + $scope.code});
			});
    }])
    .config(["$routeProvider", "$locationProvider",
      function ($routeProvider, $locationProvider) {
        $routeProvider
				.when('/error/:id', {
					templateUrl: 'errors/detailed.html',
					controller: 'errorCtrl',
					controllerAs: 'errorCtrl'
				});
      }
    ]);
}
