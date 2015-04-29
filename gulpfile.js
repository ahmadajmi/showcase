// Include Gulp & tools

var gulp         = require('gulp');
var del          = require('del');
var jshint       = require('gulp-jshint');
var watch        = require('gulp-watch');
var haml         = require('gulp-haml');
var sass         = require('gulp-sass');
var minifycss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify')
var rename       = require('gulp-rename');
var reload       = browserSync.reload;


// HAML

gulp.task('haml', function() {
  return gulp.src('app/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./public'));
});


// SASS

gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./public/styles'));
});


// Lint JavaScript

gulp.task('js', function(){
  return gulp.src([
    './app/bower_components/angular/angular.js',
    './app/bower_components/angular-resource/angular-resource.js',
    './app/bower_components/angular-route/angular-route.js',
     './app/js/app.js'])
    .pipe(jshint())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(jshint.reporter('default'));
});


// Images Min Task

gulp.task('images', function () {
  return gulp.src('./app/images/**')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/images'));
});


// Copy bower_components

gulp.task('copy:bower_components', function() {
  return gulp.src('./app/bower_components/**/*')
    .pipe(gulp.dest('./public/bower_components'));
});


// Copy Data

gulp.task('copy:data', function() {
  return gulp.src('./app/data/**/*')
    .pipe(gulp.dest('./public/data'));
});


// Copy Templates

gulp.task('copy:partials', function() {
  return gulp.src('./app/partials/**/*')
    .pipe(haml())
    .pipe(gulp.dest('./public/partials'));
});


// Watch Files & Reload

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch(['./app/index.haml'], ['haml', reload]);
  gulp.watch('./app/styles/**/*.scss', ['sass', reload]);
  gulp.watch('./app/js/**/*.js', ['js', reload]);
  gulp.watch('./app/data/**/*.json', ['copy:data', reload]);
  gulp.watch('./app/partials/**/*.haml', ['copy:partials', reload]);
});


// Clean the public Output Directory

gulp.task('clean', function() {
  del(['public/*']);
});


// Build

gulp.task('build', ['clean'], function() {
  runSequence('haml', 'sass', 'images', 'js', 'copy:bower_components', 'copy:data', 'copy:partials');
});


// Gulp Default

gulp.task('default', ['clean'], function() {
  gulp.start('public');
});
