'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var opacity = require('postcss-opacity');
var simpleVars = require('postcss-simple-vars');
var reset = require('postcss-css-reset');
var color = require('postcss-color-function');
var simpleMediaQueries = require('postcss-simple-media-queries');
var nested = require('postcss-nested');
var map = require('postcss-map');
var calc = require('postcss-calc');
var clearfix = require('postcss-clearfix');
var grid = require('postcss-grid');

var settings = require('./client/assets/css/src/_settings');

var processors = [
  postcssImport,
  simpleVars,
  clearfix,
  simpleMediaQueries(settings.simpleMediaQueries),
  map(settings.map),
  nested,
  opacity,
  color,
  calc,
  autoprefixer({ browsers: ["last 2 version", "safari 5", "ie > 9", "opera 12.1", "ios 6", "android 2.3"] }),
  grid(settings.grid),
  reset
];

function handleError(error) {
  console.log(error.toString());

  this.emit('end');
}

gulp.task('css', function () {
  return gulp.src('./client/assets/css/src/style.css')
  .pipe(postcss(processors))
  .on('error', handleError)
  .pipe(gulp.dest('./client/assets/css'));
});

gulp.task('clean-css', function() {
  return gulp.src('./client/assets/css/style.css', {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(['./client/assets/css/src/*.css', 'Gulpfile.js'], ['css']);
  });

gulp.task('default', ['watch']);