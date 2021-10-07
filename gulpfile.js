const gulp = require('gulp');
const rename = require('gulp-rename');
const fs = require('fs');

gulp.task('rename-folder', function (done) {
    fs.rename('build', 'docs', function (err) {
        if (err) {
            throw err;
        }
        done();
    });
});

gulp.task('depedencies', async function () {
    return gulp.src(
        [
            './.nojekyll'
        ]
    )
        .pipe(gulp.dest('docs/'))
});

gulp.task('file-404', async function () {
    return gulp.src('docs/index.html')
        .pipe(rename(function (path) {
            path.basename = '404';
        }))
        .pipe(gulp.dest('docs/'))
});

gulp.task('file-200', async function () {
    return gulp.src('docs/index.html')
        .pipe(rename(function (path) {
            path.basename = '200';
        }))
        .pipe(gulp.dest('docs/'))
});

gulp.task('default', gulp.series('rename-folder', 'depedencies', 'file-404', 'file-200'));