'use strict';

const gulp = require('gulp');
const theo = require('theo');
const del = require('del');
const index = require('./index');
const mediaQueries = require('./media-queries');
const content = require('./content');
const colors = require('./colors');
const gradients = require('./gradients');
const fontStack = require('./font-stack');
const units = require('./units');

// Universal Formats
theo.registerFormat('json', `[
 {{~#each props as |prop|}}
 {{~#if prop.comment}}// {{{prop.comment}}}{{/if}}
  {
    {{#if prop.meta.friendlyName}}
    "name": "{{prop.meta.friendlyName}}",
    {{else}}
    "name": "{{prop.name}}",
    {{/if}}
    "value": "{{prop.value}}",
    "token": "\${{prop.name}}"
  }{{#unless @last}},{{/unless}}{{/each}}
]
`);

function clean(cb) {
    del('./dist').then(() => {
        cb();
    });
}

const build = gulp.series(
    clean,
    gulp.parallel(index, mediaQueries, content, colors, gradients, fontStack, units),
);

gulp.task('default', build);
module.exports = build;
