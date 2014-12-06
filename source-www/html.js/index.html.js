module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('index.html',
        "It`s a base index template!!");
}]);};