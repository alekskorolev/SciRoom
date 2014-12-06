module.exports = function (angular) {
  angular.module('sciroom')
	.directive('headerCtrl', ['config', function(config) {
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
			}
		}
	}]);
}
						 
