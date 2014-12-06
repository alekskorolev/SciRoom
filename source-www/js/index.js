/*Стартовый js файл*/
var $ = jQuery = require('jquery-browserify'),
		angular = require('angular'),
		config = require('../../config.js').www;
require('angular-router-browserify')(angular);
require('angular-local-storage')(angular);
require('angular.io')(angular);


require('./lib/jquery.dropotron.min.js')($);
require('./lib/jquery.scrolly.min.js')($);
require('./lib/jquery.onvisible.min.js')($);
var skel = require('./lib/skel.min.js');
require('./lib/skel-layers.min.js')($, skel);
require('./lib/init.js')($, skel);
require('./lib/jquery.tooltipster.js')($, window, document );
angular.module('sciroom', ['ngRoute', 'LocalStorageModule', 'SocketIOModule']);

// Configure application
require('./config')(angular, config);

// Defoult routes
require('./router')(angular);

// подключение модулей
require('./modules')(angular);

// подключаем шаблоны
require('../html.js')(angular);

// Inject core controllers
require('./core')(angular);

