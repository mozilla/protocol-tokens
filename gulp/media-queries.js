const gulp = require('gulp');
const gulpTheo = require('gulp-theo');

// Formats with hex values
const unitsFormats = [
    'custom-properties.css',
    'common.js',
    'json',
    'less',
    'scss'
];

gulp.task('media-queries', () => {
    unitsFormats.map((format) => {
        gulp.src('tokens/media-queries.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/media-queries'));
    });
});
