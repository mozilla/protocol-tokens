const gulp = require('gulp');
const gulpTheo = require('gulp-theo');

const gradientsFormats = [
    'custom-properties.css',
    'common.js',
    'less',
    'scss',
    'json'
];

gulp.task('gradients', () => {
    gradientsFormats.map((format) => {
        gulp.src('tokens/gradients.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/gradients'));
    });
});
