module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('errors/detailed.html',
        "<div class=\"error error-404\">\n\t<h1>Ошибка <span ng-bind=\"code\"></span>. Попробуйте другой адрес.</h1>\n</div>");
}]);};