'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');

// Formats with px values
const unitsFormats = [
    'custom-properties.css',
    'common.js',
    'json',
    'less',
    'scss'
];

function content() {
    let tasks = [];

    unitsFormats.map((format) => {
        tasks.push(gulp.src('tokens/content.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/content')));
    });

    return merge(tasks);
}

module.exports = content;
