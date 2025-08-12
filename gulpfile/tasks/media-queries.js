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

function mediaQueries() {
    let tasks = [];

    unitsFormats.map((format) => {
        tasks.push(gulp.src('tokens/media-queries.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/media-queries')));
    });

    return merge(tasks);
}

module.exports = mediaQueries;
