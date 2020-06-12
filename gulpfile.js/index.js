var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('davos:split', tasks.davos.split);
gulp.task('davos:merge', tasks.davos.merge);
gulp.task('davos:code-list', tasks.davos['code-list']);
gulp.task('davos:code-switch', tasks.davos['code-switch']);
gulp.task('davos:code-shift', tasks.davos['code-shift']);
gulp.task('davos:code-deploy', tasks.davos['code-deploy']);
gulp.task('davos:code-deploylist', tasks.davos['code-deploylist']);
gulp.task('davos:upload-site', tasks.davos['upload-site']);
gulp.task('davos:upload-cartridges', tasks.davos['upload-cartridges']);
gulp.task('davos:watch', tasks.davos.watch);
