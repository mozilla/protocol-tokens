'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');

// Formats with hex values
const unitsFormats = [
    'custom-properties.css',
    'common.js',
    'less',
    'json',
    'scss'
];

function units() {
    let tasks = [];

    unitsFormats.map((format) => {
        tasks.push(gulp.src('tokens/units.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/units')));
    });

    return merge(tasks);
}

module.exports = units;
