var gulp = require('gulp');
var babel = require('gulp-babel');

var paths = {
  jsx_scripts: ['app/javascripts/react/*.jsx'],
  destination: 'app/javascripts/react/'
};

gulp.task('jsx', function() {
  console.log('Jsx task started.');
  gulp.src(paths.jsx_scripts)
    .pipe(babel({presets: ['react']}))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('watch', function() {
  console.log('Watch task started.');
  gulp.watch(paths.jsx_scripts, ['jsx']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
