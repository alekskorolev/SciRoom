/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('userModel', ['$rootScope', 'socketIO', '$location', function ($rootScope, io, $location) {
			var UserModel = function () {
				var priv = {
					user: {role: 'guest', profile: {name: 'Guest'}},
					mask: {
						email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					},
					// User authorithation
					login: function (authdata, cb) {
						var cb = cb || false;
						console.log(authdata)
						var errors = priv.checkAuthData(authdata);
						if (errors) {
							cb(errors);
							return errors;
						}
						io.send('auth:login', authdata, function (data) {
							// after auth
							console.log(data);
							if (data.success) {
								$.extend(true, priv.user, {role: "user", profile: { name: "Вася пупкин"}});
							} else {
								// TODO error message
							}
							if (cb) cb(!data.success);
						});
					},
					// User authorithation
					logout: function (data, cb) {
						var cb = cb || false;
						io.send('auth:logout', data, function (data) {
							// after auth
							console.log(data);
							if (data.success) {
								$.extend(true, priv.user, {role: "guest", profile: { name: "Guest"}});
							} else {
								// TODO error message
							}
							if (cb) cb(!data.success);
						});
					},
					// Валидация данных авторизации
					checkAuthData: function (authdata) {
						var errors = [];
						// TODO: create standart error library
						if (!authdata) return [{error: "UNDEFINED_DATA", msg: "Auth data cann`t be empty"}];
						if (!authdata.login) {
							errors.push({error: "UNDEFINED_LOGIN", msg: "Login cann`t be empty"});
						} else {
							if (!priv.mask.email.test(authdata.login)) errors.push({error: "UNCORECT_LOGIN", msg: "Email has incorrect format"});
						}
						if (!authdata.password) {
							errors.push({error: "UNDEFINED_PASSWORD", msg: "Password cann`t be empty"});
						} else {
							if (authdata.password.length<5) errors.push({error: "SHORT_PASSWORD", msg: "Password is short"});
						}
						return errors.length>0?errors:false;
					},
					checkAuth: function () {
						var cb = cb || false;
						io.send('auth:check', {}, function (data) {
							// after auth
							console.log(data);
							if (data.auth) {
								$.extend(true, priv.user, {role: "user", profile: { login: data.user.login}});
								
								$location.path('/lobby');
								
								console.log($location);
							} else {
								$location.path('/');
							}
							if (angular.isFunction(cb)) cb(!data.success);
						});
					}
				};
				return {
					getRole: function () {
						return priv.user.role;
					},
					profile: priv.user.profile,
					login: function (data ) {
						var cb = cb || priv.checkAuth;
						/* TODO реализовать функционал авторизации */
						priv.login(data, cb);
					},
					logout: function (data) {
						var cb = cb || priv.checkAuth;
						priv.logout(data, cb);
					},
					checkauth: function () {
						priv.checkAuth();
					}
				};
			};
			var user = new UserModel();
			user.checkauth();
			return user;
		}]);

};