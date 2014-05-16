var gulp = require('gulp')
  , util = require('gulp-util')
  , debug = require('gulp-debug')
  , using = require('gulp-using')
  , plumber = require('gulp-plumber')
  , connect = require('gulp-connect')
  , stylus = require('gulp-stylus')
  , jade = require('gulp-jade')
  , annotate = require('gulp-ng-annotate')
  , browserify = require('gulp-browserify')
  , locals = require('./app/views/locals')

gulp.build = !process.argv[2]

gulp.task('connect', function(){
  connect.server({
    root: 'www',
    livereload: true,
    port: 4500,
  })
})

gulp.task('stylus', function(){
  gulp.src('app/asset/stylus/*.styl')
    .pipe(using())
    .pipe(plumber())
    // .pipe(debug())
    .pipe(stylus({
      compress: gulp.build,
      linenos: false,
      errors: true,
    }))
    .pipe(gulp.dest('www/css'))
    .pipe(connect.reload())
})

gulp.task('jade', function() {
  locals.revised = (new Date()).toGMTString()
  gulp.src('app/views/*.jade')
    .pipe(using())
    .pipe(plumber())
    // .pipe(debug())
    .pipe(jade({
      pretty: !gulp.build,
      locals: locals, // locals won't reload on watch
    }))
    .pipe(gulp.dest('www'))
    .pipe(connect.reload())
})

gulp.task('javascript:head', function () {
  gulp.src('app/asset/script/head.js', {read: false})
    .pipe(using())
    .pipe(plumber())
    // .pipe(debug())
    .pipe(browserify({
      transform: !gulp.build ? [] : [[{ global: true }, 'uglifyify']], // crashes on errors
      debug: !gulp.build,
      insertGlobals: true,
      shim: {},
    }))
    .pipe(gulp.dest('www/js'))
    .pipe(connect.reload())
})

gulp.task('javascript:body', function () {
  gulp.src('app/asset/script/body.js', {read: false})
    .pipe(using())
    .pipe(plumber())
    // .pipe(debug())
    .pipe(browserify({
      transform: !gulp.build ? [] : [[{ global: true }, 'uglifyify']], // crashes on errors
      debug: !gulp.build,
      insertGlobals: true,
      shim: {
        angular: {
          path: 'app/asset/vendor/angular/angular.js',
          exports: 'angular'
        },
        'angular-route': {
          path: 'app/asset/vendor/angular/angular-route.js',
          exports: 'ngRoute',
          depends: {
            angular: 'angular',
          }
        },
        'angular-animate': {
          path: 'app/asset/vendor/angular/angular-animate.js',
          exports: 'ngAnimate',
          depends: {
            angular: 'angular',
          }
        },
      },
    }))
    .pipe(gulp.dest('www/js'))
    .pipe(connect.reload())
})

gulp.task('watch', ['default', 'connect'], function(){
  gulp.watch('app/asset/stylus/**', ['stylus'])
  gulp.watch('app/asset/script/**', ['javascript:head', 'javascript:body'])
  gulp.watch('app/views/**', ['jade'])
})

gulp.task('default', ['stylus', 'jade', 'javascript:head', 'javascript:body'])