module.exports = function (angular) {angular.module('sciroom').run(['$templateCache', function($templateCache) {
    $templateCache.put('lobby.html',
        "\n<script src=\"javascript/jquery.min.js\"></script>\n\n<script src=\"javascript/jquery.tooltipster.js\"></script>\n\t\n<div calss='lobby-wrap'>\n<div id=\"header-lobby   \">\n\t\t\t\t\t\t\n\t\t\t\t<!-- Inner -->\n\t\t\t\t\t<div class=\"wrapper-lobby\">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h1 id='logo-wrap'> <img src=\"images/logo.png\"</h1>\n                                <hr />\n                                </header>\n                            </div>            \n                <div class=\"lobby\">\n                    <div class=\"publ\">\n                        <div class='team tooltip' title=\"4pm boys and girls only english please\">\n                            <div class='jointeam'>Join!</div>\n                        <span class='name'>My Team</span>\n                        <span class='disription'>4pm game lang: Enlish</span>    \n                            \n                        </div>\n                        <div class='team tooltip'>\n                            <div class='jointeam full'>Full</div>\n                        <span class='name'>My Team</span>\n                        <span class='disription'>4pm game lang: Enlish</span>    \n                        </div>\n                        <div class='team'>\n                        <span class='name'>My Team</span>\n                        <span class='disription'>4pm game lang: Enlish</span>    \n                        </div>\n                        <div class='team'>\n                        <span class='name'>My Team</span>\n                        <span class='disription'>4pm game lang: Enlish</span>    \n                        </div>\n                        <div class='team'>\n                        <span class='name'>My Team</span>\n                        <span class='disription'>4pm game lang: Enlish</span>    \n                        </div>\n                        <div class='team'>\n                        <span class='name'>My Team</span>\n                        <span class='disription'>4pm game lang: Enlish</span>    \n                        </div>\n                    </div>               \n                    <div class='own'>\n                        <input type='text' class=\"team name\" placeholder=\"enter team name\">\n                        <textarea rows=\"9\" cols=\"50\" placeholder=\" Some discription\">\n                           \n                        </textarea>    \n                        <a href='#' class=\"findteam\">Find </a>\n                    </div>            \n                                \n                                \n                 </div>\n                                \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n                </div>\n\n    <script>\n        $(document).ready(function() {\n            $('.tooltip').tooltipster({\n            position:bottom;\n            offsetY: -20;\n            animation: fade;\n            });\n           /* $('.publ .team').hover(function({\n            $(this).find.closest('.jointeam').css(\"right:0\");\n            })*/\n        });\n    </script>\n    \n    ");
}]);};