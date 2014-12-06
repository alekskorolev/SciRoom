module.exports = function (app) {
	var config = app.get('config'),
		log = app.get('logger')('modules'),
		enabled = {},
		notempty = false;
	log.trace('Begin parse enebled moduels');
	for (var i=0; i < config.modules.length; i++) {
		var mod = config.modules[i];
		if (mod.enable) {
			notempty = true;
			enabled[mod.id] = mod;
		}
	};
	log.trace('End parse enebled modules, start modules initiate');
	if (notempty) {
		Object.keys(enabled).forEach(function (key) {
			try {
				require(enabled[key].path)(app);
			} catch(e) {
				log.error('Error initiate module ' + enabled[key].id + ": ", e);
			}			
		});
	} else {
		log.debug('Not enabled modules')
	}
}