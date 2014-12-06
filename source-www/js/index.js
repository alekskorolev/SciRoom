/*Стартовый js файл*/
var $ = jQuery = require('jquery-browserify'),
		angular = require('angular'),
		config = require('../../config.js').www;
require('angular-router-browserify')(angular);
require('angular-local-storage')(angular);
require('angular.io')(angular);


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

