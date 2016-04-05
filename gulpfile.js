/**
 *  Require packages
 */
var gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    cssmin      = require('gulp-cssmin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch'),
    runSequence = require('run-sequence');


/**
 * Configuration assets of project
 */
var project = {
  basePath: './app/',
  init: function() {
    this.script         = this.basePath + '/assets/script';
    this.stylesheets    = this.basePath + '/assets/stylesheets';
    this.js             = this.basePath + '/public/js';
    this.css            = this.basePath + '/public/css';
    this.banner         = '/**\n' +
                          ' * <%= pkg.name %>\n' +
                          ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                          ' */\n';
    return this;
  }
}.init();

gulp.task('copy_library', function() {
  return gulp.src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js'
    ])
    .pipe(gulp.dest(project.js + '/lib'))
});

gulp.task('css', function() {
  return gulp.src(project.stylesheets + '/*.scss')
        .pipe(compass({
          css: project.css,
          sass: project.stylesheets
        }))
        .pipe(gulp.dest(project.css))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(project.css));
});

/**
 * Default task
 */
gulp.task('default', ['copy_library', 'css']);

/**
 * Watch task
 */
gulp.task('watch', function() {
    gulp.watch(project.sass + '/*.scss', ['css']);
});