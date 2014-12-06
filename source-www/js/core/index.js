module.exports = function (angular) {
	require('./errorCtrl')(angular);
	require('./headerCtrl')(angular);
	require('./popupSnippet')(angular);
	
  angular.module('sciroom')
    .controller('indexCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 
														 function ($scope, $location, $rootScope, $routeParams) {
														 }]);

	
};