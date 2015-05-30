var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require('gulp-watch');

gulp.task("default", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("js"));
});

gulp.task('watch', function () {
    gulp.src('src/**/*.js')
        .pipe(watch('src/**/*.js'))
        .pipe(gulp.dest('js'));
});
