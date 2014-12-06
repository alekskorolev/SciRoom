module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('modules/authBase/pfsnippet.html',
        "<div class=\"profile\"><a href='#' class=\"logout\" ng-click=\"logout()\">Logout</a></div>");
}]);};