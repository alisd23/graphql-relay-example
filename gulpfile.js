
const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const liveServer = require('gulp-live-server');
const exec = require('child_process').exec;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const stream = require('webpack-stream');

const appConfig = require('./app.config');
const webpackPort = appConfig.WEBPACK_PORT;
const serverPort = appConfig.SERVER_PORT;

const paths = {
   HTML: 'index.html',
   JS: ['client/**/*.js'],
   BUILD: 'build',
   SERVER: 'server/index.js'
 };

// Main tasks
//
gulp.task('default', ['webpack-dev-server', 'server']);
gulp.task('compile', ['webpack']);
gulp.task('prod', ['compile', 'server']);

gulp.task('server', function() {
  const server = liveServer.new(paths.SERVER); //equals to gls.static('public', 3000);
  server.start();
  gulp.watch(paths.SERVER, () => server.start());
  gulp.watch([paths.HTML], ['webpack']);
});

/*
 * UPDATE GRAPHQL SCHEMA JSON FILE
 */
gulp.task('update-schema', function(cb) {
  exec('node scripts/updateSchema', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

/*
 * WEBPACK STUFF
 */

gulp.task('webpack', [], function() {
  const webpackConfig = require('./webpack.config');
  return gulp.src(paths.JS) // gulp looks for all source files under specified path
    .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
    .pipe(uglify())
    .pipe(gulp.dest(paths.BUILD));
});

gulp.task('webpack-dev-server', function(callback) {
  const webpackConfig = require('./webpack.config');
  // modify some webpack config options
  const config = Object.create(webpackConfig);
  config.devtool = 'inline-source-map';
  config.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(config), {
    // Tell wepback to pass (proxy) all requests to our server
    hot: true,
    stats: {
      colors: true
    },
    quiet: true,
    proxy: {
      '/' : `http://localhost:${serverPort}`
    }
  }).listen(webpackPort, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `http://localhost:${webpackPort}/webpack-dev-server/index.html`);
  });
});
