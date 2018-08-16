const gulp = require('gulp');
const theo = require('theo');
const runSequence = require('run-sequence');
const del = require('del');

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

gulp.task('clean', () => del('./dist'));

gulp.task('default', (done) => {
    runSequence(
        ['clean'],
        ['_index', 'media-queries', 'content', 'colors', 'gradients', 'font-stack', 'units'],
        done);
});
