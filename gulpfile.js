var gulp    = require('gulp');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var header  = require('gulp-header');
var notify  = require("gulp-notify");

var js =
[
  'src/bat.log.js',
  'src/bat.keep.js',
  'src/bat.cookie.js',
  'src/bat.ajax.js',
  'src/bat.md5.js',
  'src/bat.timer.js',
  'src/bat.scroll.js',
  'src/bat.url.js'
];

var pkg = require('./package.json');
var jsInfo =
[
    '/*!',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.url %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '',
    ''
].join('\n');

gulp.task('scripts', function()
{
  return gulp.src(js)
  .pipe(concat('bat.js'))
  .pipe(uglify())
  .pipe(header(jsInfo, { pkg: pkg }))
  .pipe(gulp.dest('dist'))
  .pipe(notify('Main bat.js file was created.'));
});

gulp.task('default', function ()
{
    gulp.watch(js, ['scripts']);
});
