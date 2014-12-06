module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('test.html',
        "Это тестовый шаблон тестового контроллера тестового модуля.");
}]);};