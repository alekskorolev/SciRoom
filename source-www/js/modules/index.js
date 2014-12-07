module.exports = function (angular) {
	require('./authBase')(angular);
	require('./lobby')(angular);
	require('./game')(angular);
}