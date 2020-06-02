var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('davos:split', tasks.davos.split);
gulp.task('davos:merge', tasks.davos.merge);
