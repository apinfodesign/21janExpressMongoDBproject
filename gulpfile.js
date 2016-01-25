"use strict";

var gulp    = require('gulp');
var mocha   = require('gulp-mocha');
const babel = require('gulp-babel');

var gutil   = require('gulp-util');
var jshint  = require('gulp-jshint');

require('babel-core/register');

gulp.task('test', () => {
    return gulp.src( 'test/**/*.js', { read: false } )
        .pipe(mocha({
            reporter: 'nyan',
            //compilers: [
            //    'js:babel-core/register',
            //]
        }));
});

gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});


gulp.task('mocha', () => {
    return gulp.src(['test/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
        //.on('error', handleError);
        .on('error', gutil.log);
});


gulp.task('lint', () => {
    return gulp.src(['*.js', 'test/*.js'], {read: false})
        .pipe(jshint('.jshintrc'))
    //     .pipe(jshint.reporter('jshint_stylish'));
});


gulp.task('watch-mocha', () => {
    gulp.watch(['./*.js', 'test/**','!package.json', '!./data/*'],
    ['lint','mocha']);
});


gulp.task('default', ['build', 'lint', 'mocha']);

gulp.task('testing', [ 'lint', 'mocha', 'watch-mocha']);