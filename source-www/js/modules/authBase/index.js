/*jslint node: true*/
console.log('test');
module.exports = function (angular) {
	require('./route')(angular);
	require('./ctrl')(angular);
	require('./user-model')(angular);
	require('./snippet')(angular);
	require('./pfsnippet')(angular);
};