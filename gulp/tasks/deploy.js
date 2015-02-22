var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var config = require('../config').ghPages;

gulp.task('deploy', ['uglify'], function(){
	return gulp.src(config.src)
			.pipe(deploy(config.settings));
});