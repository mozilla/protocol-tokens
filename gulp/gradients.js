const gulp = require('gulp')
const gulpTheo = require('gulp-theo')
const theo = require('theo')
const runSequence = require('run-sequence')
const rename = require('gulp-rename')

theo.registerFormat('gradients.android.xml', result => {
  return `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  ${result
    .get('props')
    .map( prop => {

      // Get a single hex values from a string with multiple hex values
      function getColor(position) {
          return prop.get('meta').get('value').slice(position, prop.get('meta').get('value').indexOf(',') + position)
      }

      // Display this content for radial gradients
      function isRadial() {
        if (prop.get('meta').get('type') === "radial") {
          return 'android:gradientRadius="100%p" />'
        } else {
          return '/>'
        }
      }

      // Return gradients with three colors
      if (prop.get('meta').get('value').length === 25) {
          // Return three color gradients
          return `<item android:id="@+id/${prop.get('name').replace(/-/g, '_')}">
    <shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
      <gradient
        android:angle="${prop.get('meta').get('angle')}"
        android:startColor="${getColor(0)}"
        android:centerColor="${getColor(9)}"
        android:endColor="${getColor(18)}"
        android:type="${prop.get('meta').get('type')}"
        ${isRadial()}
      </gradient>
    </shape>
  </item>`
    }

    // Return three color radial gradients
    else if (prop.get('meta').get('value').length === 16) {
        // Return two color gradients
        return `<item android:id="@+id/${prop.get('name').replace(/-/g, '_')}">
  <shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <gradient
      android:angle="${prop.get('meta').get('angle')}"
      android:startColor="${getColor(0)}"
      android:endColor="${getColor(9)}"
      android:type="${prop.get('meta').get('type')}"
      ${isRadial()}
    </gradient>
  </shape>
  </item>`
  }

  // Return empty string for gradients with more than three colors
  // https://stackoverflow.com/questions/14020530/using-a-gradientdrawable-with-more-than-three-colors-set
  else {
      return `
  <!-- ${prop.get('name')} has more than three colors and could not be generated -->
  `
    }
  })
    // convert to js for proper formatting
    .toJS()
    // convert to string to run replace function
    .toString()
    // replace commas created by .toJS
    .replace(/,/g, '')
    }
</layer-list>`;
});


theo.registerFormat('gradients.swift', result => {
  return `extension UIColor {
  ${result
    .get('props')
    .map( prop => {

      // Get a single hex values from a string with multiple hex values
      function getColor(position) {
          return `0x${prop.get('meta').get('value').slice(position, prop.get('meta').get('value').indexOf(',') + position).replace(/#/g , '').replace(/,/ , '')}`
      }

      // Create variables from hex values
      function stringLength() {
        // Four Values
        if (prop.get('meta').get('value').length === 34) {
          return `
      let color${getColor(0)} = UIColor(${getColor(0)})
      let color${getColor(9)} = UIColor(${getColor(9)})
      let color${getColor(18)} = UIColor(${getColor(18)})
      let color${getColor(27)} = UIColor(${getColor(27)})

      layer.colors = [color${getColor(0)}, color${getColor(9)}, color${getColor(18)}, color${getColor(27)}]
        `}
        // Three Values
        if (prop.get('meta').get('value').length === 25) {
          return `
      let color${getColor(0)} = UIColor(${getColor(0)})
      let color${getColor(9)} = UIColor(${getColor(9)})
      let color${getColor(18)} = UIColor(${getColor(18)})

      layer.colors = [color${getColor(0)}, color${getColor(9)}, color${getColor(18)}]
        `}
        // Two values
        else if (prop.get('meta').get('value').length === 16) {
          return `
      let color${getColor(0)} = UIColor(${getColor(0)})
      let color${getColor(9)} = UIColor(${getColor(9)})

      layer.colors = [color${getColor(0)}, color${getColor(9)}]
        `}
        // More than four values
        else {
         return `<!-- ${prop.get('name')} has more than three colors and could not be generated -->`
       }
      }

      return `
    func ${prop.get('name')}() {
      let layer : CAGradientLayer = CAGradientLayer()
      layer.frame.size = self.frame.size
      layer.frame.origin = CGPointZero
      layer.cornerRadius = CGFloat(frame.width / 20)

      ${stringLength()}

      self.layer.insertSublayer(layer, atIndex: 0)
    }`
    })
    // convert to js for proper formatting
    .toJS()
    // convert to string to run replace function
    .toString()

    .replace(/},/g, '}').replace(/>,/g, '>')
    }
}`;
});

const gradientsFormats = [
  'custom-properties.css',
  'common.js',
  'less',
  'scss',
  'json'
];

gulp.task('gradients:raw', () =>
  gradientsFormats.map((format) =>
    gulp.src('tokens/gradients.yml')
    .pipe(gulpTheo({
      transform: { includeMeta: true },
      format: { type: format }
    }))
    .pipe(gulp.dest('dist/gradients'))
  ),
);

gulp.task('gradients:android', () =>
  gulp.src('tokens/gradients.yml')
  .pipe(gulpTheo({
    transform: { includeMeta: true },
    format: { type: 'gradients.android.xml' }
  }))
  .pipe(rename(function(opt) {
    opt.basename = opt.basename.replace('gradients.', '');
    return opt;
  }))
  .pipe(gulp.dest('dist/gradients'))
);

gulp.task('gradients:swift', () =>
  gulp.src('tokens/gradients.yml')
  .pipe(gulpTheo({
    transform: { includeMeta: true },
    format: { type: 'gradients.swift' }
  }))
  .pipe(rename(function(opt) {
    opt.basename = opt.basename.replace('gradients.', '');
    return opt;
  }))
  .pipe(gulp.dest('dist/gradients'))
);

// All formats
gulp.task('gradients', (done) =>
  runSequence([
    'gradients:raw',
    'gradients:android',
    'gradients:swift'
  ], done)
)
