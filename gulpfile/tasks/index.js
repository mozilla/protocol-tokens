'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');
const rename = require('gulp-rename');

// Formats with hex values
const indexFormats = [
    'custom-properties.css',
    'common.js',
    'less',
    'json',
    'scss'
];

function index() {
    let tasks = [];

    indexFormats.map((format) => {
        tasks.push(gulp.src('tokens/_index.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(rename(function(path) {
                path.basename = 'index';
            }))
            .pipe(gulp.dest('dist/')));
    });

    return merge(tasks);
}

module.exports = index;
