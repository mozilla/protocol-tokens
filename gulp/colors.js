const gulp = require('gulp')
const gulpTheo = require('gulp-theo')
const theo = require('theo')
const path = require('path')
const runSequence = require('run-sequence')
const rename = require('gulp-rename')

theo.registerFormat('colors.android.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
  {{~#each props as |prop|}}
  {{#if prop.comment}}// {{{prop.comment}}}{{/if}}
  <color name="{{replace prop.name '-' '_'}}">{{prop.value}}</color>{{/each}}
</resources>
`)

theo.registerFormat('colors.swift', `extension UIColor {
  struct Protocol {
    {{#each props as |prop|}}
      static let {{prop.name}} = UIColor(rgb: 0x{{replace prop.value '#' ''}})
    {{/each}}
  }
}
`)

theo.registerFormat('colors.soc', `<?xml version="1.0" encoding="UTF-8"?>
<ooo:color-table
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns:ooo="http://openoffice.org/2004/office">
  {{#each props as |prop|}}
  {{#if prop.comment}}<!-- {{{prop.comment}}} -->{{/if}}
  <draw:color draw:name="{{prop.name}}" draw:color="{{prop.value}}" />
  {{/each}}
</ooo:color-table>
`)

// GPL: Convert strings to title case
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// GPL: Run multiple replace functions on a single value
theo.registerFormat('gpl', result => {
  return `GIMP Palette
Name: Protocol Colors
  ${result
    .get('props')
    .map( prop => `
${prop.get('value').replace('rgb(', '').replace(')', '')} ${prop.get('name').replace(/-/g, ' ')}`)
    // convert to js for proper formatting
    .toJS()
    // convert to string to run replace function
    .toString()
    // replace commas created by .toJS
    .replace(/,/g, '')
    .toProperCase()
    }
`;
});

// Formats with hex values
const colorsFormats = [
  'custom-properties.css',
  'common.js',
  'json',
  'less',
  'scss',
  'colors.soc'
];

gulp.task('colors:raw', () =>
  colorsFormats.map((format) =>
    gulp.src('tokens/colors.yml')
    .pipe(gulpTheo({
      transform: { includeMeta: true },
      format: { type: format }
    }))
    .pipe(gulp.dest('dist/colors'))
  ),
);

// Formats with rgb() values
gulp.task('colors:web', () =>
  gulp.src('tokens/colors.yml')
  .pipe(gulpTheo({
    transform: { type: 'web' },
    format: { type: 'gpl' }
  }))
  .pipe(gulp.dest('dist/colors'))
);

// Formats with 8-digit hex values
gulp.task('colors:android', () =>
  gulp.src('tokens/colors.yml')
  .pipe(gulpTheo({
    transform: { type: 'android' },
    format: { type: 'colors.android.xml' }
  }))
  .pipe(rename(function(opt) {
    opt.basename = opt.basename.replace('colors.', '');
    return opt;
  }))
  .pipe(gulp.dest('dist/colors'))
);

// Formats with 8-digit hex values
gulp.task('colors:swift', () =>
  gulp.src('tokens/colors.yml')
  .pipe(gulpTheo({
    format: { type: 'colors.swift' }
  }))
  .pipe(rename(function(opt) {
    opt.basename = opt.basename.replace('colors.', '');
    return opt;
  }))
  .pipe(gulp.dest('dist/colors'))
);

// All formats
gulp.task('colors', (done) =>
  runSequence([
    'colors:raw',
    'colors:web',
    'colors:android',
    'colors:swift'
  ], done)
)
