const gulp = require('gulp')
const gulpTheo = require('gulp-theo')
const rename = require('gulp-rename')

// Formats with hex values
const unitsFormats = [
  'custom-properties.css',
  'common.js',
  'less',
  'json',
  'scss'
];

gulp.task('units', () => {
  unitsFormats.map((format) => {
    gulp.src('tokens/units.yml')
    .pipe(gulpTheo({
      transform: { includeMeta: true },
      format: { type: format }
    }))
    .pipe(gulp.dest('dist/units'))
  });
});
