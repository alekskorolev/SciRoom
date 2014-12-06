/*jslint node: true*/
console.log('test');
module.exports = function (angular) {
	
	angular.module('sciroom')
    .directive('profileBaseSnippet',['userModel', '$rootScope', function (userModel, $rootScope) {
        return {
            templateUrl: 'modules/authBase/pfsnippet.html',
            replace: false,
            transclude: false,
            restrict: 'EA',
            scope: false,
            controller: function ($scope, $element, $attrs, $transclude) {
							
							$.extend($scope, {
								user: userModel,
								auth: {login: "", password: ""},
								logout: function () {
									$scope.user.logout({}, function (errors) {
										console.log(errors);
									});
								}
							});
							console.log(userModel);
            }           
        }
    }]);
};