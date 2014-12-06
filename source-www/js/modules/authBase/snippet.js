/*jslint node: true*/
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
								auth: {login: "fail@alesan.ru", password: "1qaz2wsx"},
								pressEnter: function ($event) {
									console.log($event.keyCode);
									if ($event.keyCode==13) $scope.startLogin();
								},
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