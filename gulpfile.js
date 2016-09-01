var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    stringify = require('stringify')
    concat = require('gulp-concat');

gulp.task('connect', function() {
	return connect.server({
		livereload: true
	});
});

gulp.task('sass', function() {
  gulp.src('./Content/css/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('./dest/css/'))
  .pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('./*.html')
	.pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src('./js/*.js', {read: false})
	.pipe(browserify())
  .pipe(concat('bundle.js'))
	.pipe(gulp.dest('./dest/js'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['./Content/css/*.sass'], ['sass']);
	gulp.watch(['./dest/css/*.css'], ['sass']);
	gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./js/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'js']);
