/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('userModel', ['$rootScope', 'socketIO', function ($rootScope, io) {
			var UserModel = function () {
				var priv = {
					user: {role: 'guest', profile: {name: 'Guest'}},
					// Авторизация пользователя.
					login: function (authdata, cb) {
						var errors = priv.checkAuthData(authdata);
						if (errors) {
							cb(errors);
							return errors;
						}
						io.send('auth:login', authdata, function (data) {
							// После авторизации
							console.log(data);
							if (data.success) {
								$.extend(true, priv.user, {role: "user", profile: { name: "Вася пупкин"}});
							} else {
								// TODO сообщение об ошибке
							}
							if (cb) cb(!data.success);
						});
					},
					// Валидация данных авторизации
					checkAuthData: function (authdata) {
						var errors = [];
						// TODO: вынести ошибки в библиотеку ошибок, стандартизировать коды и сообщения, добавить возможность локализации сообщений.
						if (!authdata) return [{error: "UNDEFINED_DATA", msg: "Auth data cann`t be empty"}];
						if (!authdata.mail) {
							errors.push({error: "UNDEFINED_LOGIN", msg: "Login cann`t be empty"});
						} else {
							
						}
						if (!authdata.password) {
							errors.push({error: "UNDEFINED_PASSWORD", msg: "Password cann`t be empty"});
						} else {
							
						}
						return errors.length>0?errors:false;
					},
					// Регистрация пользователя.
					register: function (authdata, cb) {
						console.log(authdata);
						var errors = priv.checkRegData(authdata);
						if (errors) {
							cb(errors);
							return errors;
						}
						io.send('auth:register', authdata, function (data) {
							// После авторизации
							console.log(data);
							if (data.success) {
								$.extend(true, priv.user, {role: "user", profile: { name: "Вася пупкин"}});
							} else {
								// TODO сообщение об ошибке
							}
							if (cb) cb(!data.success);
						});
					},
					// Валидация данных авторизации
					checkRegData: function (authdata) {
						
						// TODO: вынести ошибки в библиотеку ошибок, стандартизировать коды и сообщения, добавить возможность локализации сообщений.
						if (!authdata) return [{error: "UNDEFINED_DATA", msg: "Reg data cann`t be empty"}];
						var errors = priv.checkAuthData({mail: authdata.mail, password: authdata.password[0]});
						if (errors.length>0) {
							return errors;
						} else if (authdata.password[0] != authdata.password[1]) {
							return [{error: "PASSWORDS_NOT_COMPARE", msg: "Password  and repassword whold be equivalent"}];
						} else {
							return false;
						}
						return false;
					}
				};
				return {
					getRole: function () {
						return priv.user.role;
					},
					profile: priv.user.profile,
					login: function (data, cb) {
						/* TODO реализовать функционал авторизации */
						priv.login(data, cb);
					},
					logout: function () {
						/* TODO реализовать функционал */
					 	$.extend(true, priv.user, {role: "guest", profile: { name: "Guest"}});
					},
					register: function (data, cb) {
						/* TODO реализовать функционал */
						priv.register(data, cb);
					}
				};
			};
			return new UserModel();
		}]);

};