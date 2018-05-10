const gulp = require('gulp')
const gulpTheo = require('gulp-theo')

// Formats with hex values
const unitsFormats = [
  'custom-properties.css',
  'common.js',
  'json',
  'less',
  'scss'
];

gulp.task('font-stack', () =>
  unitsFormats.map((format) =>
    gulp.src('tokens/font-stack.yml')
    .pipe(gulpTheo({
      transform: { includeMeta: true },
      format: { type: format }
    }))
    .pipe(gulp.dest('dist/font-stack'))
  ),
);
