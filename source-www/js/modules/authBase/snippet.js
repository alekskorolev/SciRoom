/*jslint node: true*/
console.log('test');
module.exports = function (angular) {
	
	angular.module('sciroom')
    .directive('authBaseSnippet',['userModel', '$rootScope', function (userModel, $rootScope) {
        return {
/*             compile: function compile(temaplateElement, templateAttrs) {
                return {
                    pre: function (scope, element, attrs) {
                    },
                    post: function(scope, element, attrs) { 
                    }
                }
            },*/
/*            link: function (scope, element, attrs) {
							
            },*/
            templateUrl: 'modules/authBase/snippet.html',
            replace: false,
            transclude: false,
            restrict: 'EA',
            scope: false,
            controller: function ($scope, $element, $attrs, $transclude) {
							
							$.extend($scope, {
								user: userModel,
								login: {mail: "", password: ""},
								register: {mail: "", password: ["",""]},
								toogleLoginRoute: function () {
									return $scope.user.getRole()=="guest"?"#/authBase/login":"#/authBase/logout";
								},
								loginCaption: function () {
									return $scope.user.getRole()=="guest"?"Войти":"Выйти";
								},
								registerCaption: function () {
									return $scope.user.getRole()=="guest"?"Регистрация":"";
								},
								toogleLogin: function () {
									if($scope.user.getRole()=="guest") {
										$rootScope.$broadcast('popup:open:login-popup');
									} else {
										$scope.user.logout();
									}
									return false;
								},
								startLogin: function () {
									$scope.user.login($scope.login, function (errors) {
										console.log(errors);
										if (!errors) $rootScope.$broadcast('popup:closeAll');
									});
								},
								startRegister: function () {
									console.log('start');
									$scope.user.register($scope.register, function (errors) {
										console.log(errors);
										if (!errors) $rootScope.$broadcast('popup:closeAll');
									});
								},
								toogleRegister: function () {
									if($scope.user.getRole()=="guest") {
										$rootScope.$broadcast('popup:open:register-popup');
									}
									return false;
								}
							});
							console.log(userModel);
            }           
        }
    }]);
};