/*jslint node: true*/
console.log('test');
module.exports = function (angular) {
	
	angular.module('sciroom')
    .directive('authBaseSnippet',['userModel', '$rootScope', function (userModel, $rootScope) {
        return {
            templateUrl: 'modules/authBase/snippet.html',
            replace: false,
            transclude: false,
            restrict: 'EA',
            scope: false,
            controller: function ($scope, $element, $attrs, $transclude) {
							
							$.extend($scope, {
								user: userModel,
								auth: {login: "", password: ""},
								startLogin: function () {
									$scope.user.login($scope.auth, function (errors) {
										console.log(errors);
									});
								}
							});
							console.log(userModel);
            }           
        }
    }]);
};