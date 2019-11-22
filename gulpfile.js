var gulp = require('gulp');
var ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

gulp.task('prod', ()=> {
    return gulp.src('src/**/*.ts')
        .pipe(ts({}))
        .pipe(uglify())
        .pipe(gulp.dest('build/prod'));
});

gulp.task('local', ()=> {
    return gulp.src('src/**/*.ts')
        .pipe(ts({}))
        .pipe(gulp.dest('build/local'));
});