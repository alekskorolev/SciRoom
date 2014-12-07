var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserify = require('gulp-browserify');
var angularTemplates = require('gulp-angular-templates');
var log4js = require('log4js');
var webserver = require('gulp-webserver');
var log = log4js.getLogger();
log.setLevel('info');
var nodemon = require('gulp-nodemon');
var config = require('./config');
var src = config.src;
var dst = config.dst;
var srv = config.srv;
// Basic usage
console.log(config);
gulp.task('scripts', function() {
  // Single entry point to browserify
  var brsf = browserify({
      insertGlobals : true,
      debug : true
    });
  brsf.on('error',function(e){
      log.error(e);
      brsf.end();
    });
  gulp.src(src.js+'index.js')
    .pipe(brsf)
    .pipe(gulp.dest(dst.js))
});

gulp.task('html', function () {
  var atml = angularTemplates({module: 'sciroom', withBrowserify: true});
  atml.on('error',function(e){
      log.error(e);
      atml.end();
    });
  gulp.src(src.html+'**/*.html')
    .pipe(atml)
    .pipe(gulp.dest(dst.html));
});

gulp.task('www', function () {
	gulp.src(srv.root)
		.pipe(webserver(srv.options));
});

gulp.task('less', function () {
    var lss = less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      });
    lss.on('error',function(e){
      log.error(e);
      lss.end();
    });
    gulp.src(src.css+'style.less')
      .pipe(lss)
      .pipe(gulp.dest(dst.css));
})

gulp.task('serve', function (cb) {
    nodemon({
        script  : './server/app.js',
        watch   : 'server/**/*.*'
    });
});

// Действия по умолчанию
gulp.task('default', function(){
	
  gulp.run('html', 'scripts', 'less', 'serve');//, 'www');

  gulp.watch([dst.html+'**/*.js',dst.html+'*.js',src.js+'*.js', src.js + "**/*.js"], function(event){
    gulp.run('scripts');
  });
  gulp.watch([src.html+'**/*.html',src.html+'*.html'], function(event){
    gulp.run('html');
  });
  gulp.watch([src.css+"**/*.less"], function(event){
    gulp.run('less');
  });
});

