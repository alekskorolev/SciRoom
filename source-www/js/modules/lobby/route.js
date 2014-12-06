module.exports = function (angular) {
  angular.module('sciroom')
    .config(["$routeProvider", "$locationProvider", 
      function ($routeProvider, $locationProvider) {
        $routeProvider
         .when('/lobby', {
            templateUrl: 'modules/lobby/index.html',
            controller: 'lobbyCtrl',
            controllerAs: 'lobbyCtrl'
          });
      }
    ]);
}