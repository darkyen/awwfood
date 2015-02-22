var gulp = require('gulp');
var config = require('../config.js').uglify;
var uglify = require('gulp-uglify');

gulp.task('uglify', ['build'], function(){
	return gulp.src(config.src)
			.pipe(uglify())
			.pipe(gulp.dest('./dist/js/'));
})