'use strict';

const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const merge = require('merge-stream');

const gradientsFormats = [
    'custom-properties.css',
    'common.js',
    'less',
    'scss',
    'json'
];

function gradients() {
    let tasks = [];

    gradientsFormats.map((format) => {
        tasks.push(gulp.src('tokens/gradients.yml')
            .pipe(gulpTheo({
                transform: { includeMeta: true },
                format: { type: format }
            }))
            .pipe(gulp.dest('dist/gradients')));
    });

    return merge(tasks);
}

module.exports = gradients;
