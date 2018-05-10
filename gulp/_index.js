const gulp = require('gulp')
const gulpTheo = require('gulp-theo')
const rename = require('gulp-rename')

// Formats with hex values
const indexFormats = [
  'custom-properties.css',
  'common.js',
  'less',
  'json',
  'scss'
];

gulp.task('_index', () =>
  indexFormats.map((format) =>
    gulp.src('tokens/_index.yml')
    .pipe(gulpTheo({
      transform: { includeMeta: true },
      format: { type: format }
    }))
    .pipe(rename(function(path) {
      path.basename = "index";
    }))
    .pipe(gulp.dest('dist/'))
  ),
);
