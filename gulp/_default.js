const gulp = require('gulp')
const theo = require('theo')
const runSequence = require('run-sequence')

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
    "token": "\${{prop.name}}",
  }{{#unless @last}},{{/unless}}{{/each}}
]
`)

gulp.task('default', (done) =>
  runSequence([
    '_index',
    'breakpoints',
    'colors',
    'gradients',
    'font-stack',
    'units'
  ], done)
)
