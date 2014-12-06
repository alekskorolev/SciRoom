module.exports = function (angular) {
  angular.module('sciroom')
    .controller('lobbyCtrl',['$scope', '$location', '$rootScope', '$routeParams', function ($scope, $location, $rootScope, $routeParams) {
      angular.extend($scope, {
      });
    }]);
}