module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('modules/authBase/snippet.html',
        "<form>\n\t<input type=\"text\" ng-model=\"auth.login\" class='login mail' placeholder=\"enter your email\">\n\t<input type=\"password\" ng-model=\"auth.passwod\" class='login pass' placeholder=\"password\">\n\t<a ng-click=\"startLogin()\" class=\"button circled scrolly\">Start</a>\n</form>\n");
}]);};