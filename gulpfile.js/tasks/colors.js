'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');
const theo = require('theo');

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
`);

// Sketch
theo.registerFormat('sketch.json', `[
 {{~#each props as |prop|}}
 {{~#if prop.comment}}// {{{prop.comment}}}{{/if}}
  {
    "name": "{{prop.name}}",
    "value": "{{prop.value}}"
  }{{#unless @last}},{{/unless}}{{/each}}
]
`);

function formatGPL(result) {
    return result.get('props').map(prop => {
        return `${prop.get('value').replace('rgb(', '').replace(')', '')} ${prop.get('name').replace(/-/g, ' ')} \n`;
    })
        // convert to js for proper formatting
        .toJS()
        // convert to string to run replace function
        .toString()
        // replace commas created by .toJS
        .replace(/,/g, '')
        // convert strings to title case
        .replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
}

// GPL: Run multiple replace functions on a single value
theo.registerFormat('gpl', result => {
    return `
GIMP Palette
Name: Protocol Colors
${formatGPL(result)}
    `.trim();
});

// Formats with hex values
const colorsFormats = [
    'custom-properties.css',
    'common.js',
    'json',
    'ios.json',
    'less',
    'scss',
    'colors.soc',
    'sketch.json'
];

function raw() {
    let tasks = [];

    colorsFormats.map((format) => {
        tasks.push(gulp.src('tokens/colors.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/colors')));
    });

    return merge(tasks);
}

// Formats with rgb() values
function web() {
    return gulp.src('tokens/colors.yml')
        .pipe(gulpTheo({
            transform: { type: 'web' },
            format: { type: 'gpl' }
        }))
        .pipe(gulp.dest('dist/colors'));
}

// Formats with 8-digit hex values
function android() {
    return gulp.src('tokens/colors.yml')
        .pipe(gulpTheo({
            format: { type: 'android.xml' }
        }))
        .pipe(gulp.dest('dist/colors'));
}

// All formats
const colors = gulp.parallel(raw, web, android);

module.exports = colors;
