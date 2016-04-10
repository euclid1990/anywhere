/**
 *  Require packages
 */
var gulp        = require('gulp'),
    ts          = require('gulp-typescript'),
    tslint      = require('gulp-tslint'),
    compass     = require('gulp-compass'),
    cssmin      = require('gulp-cssmin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch'),
    browserify  = require('gulp-browserify'),
    runSequence = require('run-sequence');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

/**
 * Configuration assets of project
 */
var project = {
    basePath: './app/',
    init: function() {
        this.scripts        = this.basePath + '/assets/scripts';
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
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system-polyfills.js.map',
        'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js'
    ])
    .pipe(gulp.dest(project.js + '/libs'))
});

gulp.task('copy_angularfire', function() {
  return gulp.src([
        'node_modules/angularfire2/**/*.js',
        'node_modules/angularfire2/**/*.map'
    ])
    .pipe(gulp.dest(project.js + '/libs/angularfire2'))
});

gulp.task('browserify', function () {
    return gulp.src([
        'node_modules/firebase/lib/firebase-web.js'
    ])
    .pipe(browserify())
    .pipe(gulp.dest(project.js + '/libs'));
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

gulp.task('typescript', function () {
    return gulp.src([
            'typings/browser.d.ts',
            project.scripts + '/*.ts',
            project.scripts + '/*/*.ts'
        ])
        .pipe(tslint()).pipe(tslint.report('prose'))
        .pipe(ts(tsProject))
        .pipe(gulp.dest(project.js));
});

/**
 * Default task
 */
gulp.task('default', ['copy_library', 'copy_angularfire', 'browserify', 'css', 'typescript']);

/**
 * Watch task
 */
gulp.task('watch', function() {
    gulp.watch(project.scripts + '/*.ts', ['typescript']);
    gulp.watch(project.stylesheets + '/*.scss', ['css']);
});