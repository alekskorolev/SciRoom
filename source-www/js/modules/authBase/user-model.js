/*jslint node: true*/
module.exports = function (angular) {
	angular.module('sciroom')
		.factory('userModel', ['$rootScope', 'socketIO', '$location', '$q',
													 function ($rootScope, io, $location, $q) {
			var UserModel = function () {
				var priv = {
					user: {role: 'guest', profile: {name: 'Guest', login: ""}},
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
								$.extend(true, priv.user, {role: "user", profile: { name: data.user.name, login: data.user.login, id: data.user._id}});
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
								$.extend(true, priv.user, {role: "guest", profile: { name: "Guest", login: "", id: false}});
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
						var that = this;
						var deffered = $q.defer();
						var cb = cb || false;
						io.send('auth:check', {}, function (data) {
							// after auth
							console.log(data);
							if (data.auth) {
								$.extend(true, priv.user, {role: "user", profile: {  name: data.user.name, login: data.user.login, id: data.user._id}});
								
								if ($location.$$path == "/") $location.path('/lobby');
								
								console.log($location);
								deffered.resolve(this);
							} else {
								$location.path('/');
								deffered.reject();
							}
							if (angular.isFunction(cb)) cb(!data.success);
						});
						return deffered.promise;
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
						return priv.checkAuth();
					}
				};
			};
			var user = new UserModel();
			user.checkauth();
			return user;
		}]);

};