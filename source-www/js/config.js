module.exports = function (angular, config) {
  angular.module('sciroom')
	.constant('config', config)
	.config(function(config, socketIOProvider) {
		socketIOProvider.configure(config.api);
	});
}
