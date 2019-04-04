'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');
const theo = require('theo');

// Sketch
theo.registerFormat('sketch.json', `[
 {{~#each props as |prop|}}
 {{~#if prop.comment}}// {{{prop.comment}}}{{/if}}
  {
    "name": "{{prop.name}}",
    "x": {{prop.meta.x}},
    "y": {{prop.meta.y}},
    "blur": {{prop.meta.blur}},
    "spread": {{prop.meta.spread}},
    "color": "{{prop.meta.color}}",
    "inset": {{prop.meta.inset}}
  }{{#unless @last}},{{/unless}}{{/each}}
]
`);

const shadowFormats = [
    'custom-properties.css',
    'common.js',
    'less',
    'scss',
    'json',
    'sketch.json'
];

function shadows() {
    let tasks = [];

    shadowFormats.map((format) => {
        tasks.push(gulp.src('tokens/shadows.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/shadows')));
    });

    return merge(tasks);
}

module.exports = shadows;
