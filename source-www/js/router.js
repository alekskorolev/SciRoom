module.exports = function (angular) {
  angular.module('sciroom')
    .config(["$routeProvider", "$locationProvider",
      function ($routeProvider, $locationProvider) {
        $routeProvider
         .when('/', {
            templateUrl: 'index.html',
            controller: 'indexCtrl',
            controllerAs: 'indexCtrl'
          })
 					.otherwise({
            templateUrl: 'errors/404.html',
            controller: 'errorCtrl',
            controllerAs: 'errorCtrl'
          });
      }
    ]);
}
