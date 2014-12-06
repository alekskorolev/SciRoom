module.exports = function (angular) {
  angular.module('sciroom')
	.directive('headerCtrl', ['config',"userModel", '$rootScope', function(config,userModel, $rootScope) {
		return {
			restrict: 'A',
			link: function($scope, element, attrs) {
				angular.extend($scope, {
					head: {
						title: config.constants.title
					}
				});
				$scope.$on('header:title', function (event, msg) {
					console.log(msg);
					$scope.head.title = config.constants.title + " / " + msg.title;
				});
				$rootScope.$on('$routeChangeStart', function (event, next) {
            userModel.checkauth();
        });
			}
		}
	}]);
}
						 
