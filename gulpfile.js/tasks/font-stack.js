'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');

// Formats with hex values
const unitsFormats = [
    'custom-properties.css',
    'common.js',
    'json',
    'less',
    'scss'
];

function fontStack() {
    let tasks = [];

    unitsFormats.map(format => {
        tasks.push(gulp.src('tokens/font-stack.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/font-stack')));
    });

    return merge(tasks);
}

module.exports = fontStack;
