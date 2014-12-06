module.exports = function (angular) {
	require('./errors')(angular);
	require('./modules')(angular);
	require('./index.html')(angular);
    require('./lobby.html')(angular);
    
}