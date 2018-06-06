const gulp = require('gulp');
const gulpTheo = require('gulp-theo');

// Formats with px values
const unitsFormats = [
    'custom-properties.css',
    'common.js',
    'json',
    'less',
    'scss'
];

gulp.task('content', () => {
    unitsFormats.map((format) => {
        gulp.src('tokens/content.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/content'));
    });
});
