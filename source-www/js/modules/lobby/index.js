module.exports = function (angular) {
	require('./route')(angular);
	require('./ctrl')(angular);
	require('./team-model')(angular);
};