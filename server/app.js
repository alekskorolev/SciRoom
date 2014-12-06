/* for JSHint */
/* global require */
/* global __dirname */
var Express = require('express.io'),
		mongoose = require('mongoose'),
		mrCache = require('mongoose-redis-cache'),
		app = Express(),
		config = require('../config').app,
		utils = require('./utils'),
		Log = utils.Log((config.mode=='production')?'ERROR':'TRACE'),
		log = Log('app.js'),
		events = require('events'),
		eventEmitter = new events.EventEmitter(),
		modules = require('./modules');

log.trace('Start mongo connection with params: ', config.mongo.host, '/'+config.mongo.db);
mongoose.connect("mongodb://"+config.mongo.host+'/'+config.mongo.db);
mrCache(mongoose);


app.http().io();

app.set('config', config);
app.set('logger', Log);
app.set('orm', mongoose);
app.set('eventEmitter', eventEmitter);


app.use(Express.bodyParser({
		uploadDir: __dirname + '/../www/uploads',
		limit: 1000000,
		keepExtensions: true,
		defer: true
}));
app.use(utils.Cors);
app.use(Express.cookieParser());
app.use(Express.session({secret: 'swvffserfsxsfe'}));

modules(app);

app.get('/',function (req, res) {
		res.send('It`s work');
		req.io.broadcast('new visitor');
	});
app.io.route('prosto:test', function (req) {
	log.debug(req.data);
	req.io.emit('prosto:otvet', {test: "toge test"});
});
log.trace('Application started listen: http://localhost:' + config.port);
app.listen(config.port);

