var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var notify       = require("gulp-notify");

var js = [ 'src/bat.*.js' ];

gulp.task('scripts', function()
{
  return gulp.src(js)
  .pipe(concat('bat.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./'))
  .pipe(notify('Main bat.js file was created.'));
});

gulp.task('default', function ()
{
    gulp.watch(js, ['scripts']);
});
