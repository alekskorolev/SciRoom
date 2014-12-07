module.exports = function (angular) {
  angular.module('sciroom')
    .config(["$routeProvider", "$locationProvider", 
      function ($routeProvider, $locationProvider) {
        $routeProvider
         .when('/game', {
            templateUrl: 'modules/game/index.html',
            controller: 'gameCtrl',
            controllerAs: 'gameCtrl'
          });
      }
    ]);
}