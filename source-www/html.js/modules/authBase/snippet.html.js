module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('modules/authBase/snippet.html',
        "<form ng-submit=\"startLogin()\">\n\t<input type=\"text\" ng-model=\"auth.login\" class='login mail' placeholder=\"enter your email\" ng-keypress=\"pressEnter($event)\">\n\t<input type=\"password\" ng-model=\"auth.password\" class='login pass' placeholder=\"password\" ng-keypress=\"pressEnter($event)\">\n\t<a ng-click=\"startLogin()\" class=\"button circled scrolly\">Start</a>\n</form>\n");
}]);};