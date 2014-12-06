module.exports = function (angular) {
	var popups = [];
	var closeAll = function (currentId) {
		angular.forEach(popups, function (popup) {
			if (popup.id!=currentId) popup.close();
		});
	}
  angular.module('sciroom')
		.directive('popupSnippet', ['config', '$rootScope', function (config, $rootScope) {
			return {
				restrict: 'EA',
				compile: function ($element, $attrs) {
					$attrs.popupBtns = JSON.parse($attrs.popupBtns);
					var btnsHtml = '<div class="btn-panel">';
					angular.forEach($attrs.popupBtns, function (btn, id) {
						if (angular.isString(btn)) {
							btn = {
								action: btn, 
								id: id,
								caption: id
							}
						}
						btn.id = btn.id || id;
						if (btn.action=="default") {
							if (btn.id=="cancel" || btn.id=="close") btn.action = "closeAllPopups";
						}
						btnsHtml+='<button class="'+btn.id+'" ng-click="'+btn.action+'()">'+btn.caption+'</button>';
					});
					btnsHtml+='</div>';
					$element.html('<div class="overlay" ng-click="closeAllPopups()"></div><div class="container">'
												+$element.html()+btnsHtml+'</div>');
					console.log($element, $attrs);
					return {
						pre: function () {},
						post: function ($scope, element, attrs) {

							$.extend($scope, {
								closeAllPopups: function () {
									$rootScope.$broadcast('popup:closeAll');
								}
							});
							element.hide();
							$scope.$on('popup:open:'+attrs.popupId, function () {
								$rootScope.$broadcast('popup:closeAll', {id: attrs.popupId});
								element.show();
							});

							$scope.$on('popup:closeAll', function (event, data) {
								data = data || {};
								if (data.id!=attrs.popupId) {
									element.hide();
								}
							});
						}
					}
				}
			};
		}]);
};