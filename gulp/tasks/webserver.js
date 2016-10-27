var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('webserver', function () {
  connect.server({
    livereload: true,
    root: 'www',
    port: 8001
  })
})
