module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('modules/authBase/snippet.html',
        "<div class=\"user-widget\">\n\t<input type=\"text\" ng-model=\"auth.login\">\n\t<input type=\"password\" ng-model=\"auth.password\">\n\t<a ng-click=\"startLogin()\">Start</a>\n</div>");
}]);};