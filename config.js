/* for jsHint */
/* global module */
// Source dirs
var src = {
  js: "source-www/js/",
  css: "source-www/less/",
  html: "source-www/html/"
};
// Dest dirs
var dst = {
  js: "www/js/",
  css: "www/css/",
  html: "source-www/html.js/"
};
// web-dev
var srv = {
	root: "www",
	options: {
		host: "localhost",
		port: 8808,
		livereload: true,
		fallback: "index.html"
	}
	
	
};
// node.js
var app = {
	port: 8809,
	mongo: {
		host: "localhost",
		db: "sciroom"
	},
	mode: 'development',
	modules: [
		//{id: 'module-id', enable: true, path: './path to module relative with ./server/modules'}
	]
};

var www = {
		api: {
			protocol: 'http',
			host: 'localhost',
			port: 8809,
			path: ''
		},
		constants: {
			title: "SciRoom"
		}
	};

module.exports = {
	src: src,
	dst: dst,
	srv: srv,
	app: app,
	www: www
};