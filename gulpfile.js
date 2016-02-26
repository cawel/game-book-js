var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var paths = {
  js_scripts: ['app/javascripts/**/*.js'],
  jsx_scripts: ['app/javascripts/react/*.jsx'],
  destination: 'app/javascripts/react/'
};

gulp.task('eslint', function() {
  gulp.src(paths.js_scripts)
    .pipe(eslint())
});

gulp.task('jsx', function() {
  console.log('Jsx task started.');
  gulp.src(paths.jsx_scripts)
    .pipe(babel({presets: ['react']}))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('watch', function() {
  console.log('Watch task started.');
  gulp.watch(paths.jsx_scripts, ['jsx']);
  gulp.watch(paths.js_scripts, ['eslint']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
