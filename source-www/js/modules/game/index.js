/*jslint node: true*/
console.log('test');
module.exports = function (angular) {
	require('./route')(angular);
	require('./ctrl')(angular);
	require('./game-srvc')(angular);
};