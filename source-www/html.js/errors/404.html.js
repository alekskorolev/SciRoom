module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('errors/404.html',
        "<div class=\"error error-404\">\n\t<h1>Такой страницы еще не придумали, возможно вы ввели неверный адрес или ссылка была битая.. Посмотрите другие страницы.</h1>\n</div>");
}]);};