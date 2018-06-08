# Protocol Tokens

Design tokens for Protocol, Mozilla’s design system.

<em>JavaScript · JSON · CSS · SCSS</em>

---

## Information

<table>
<tr>
<td>Package</td><td>@mozilla-protocol/tokens</td>
</tr>
<tr>
<td>Description</td>
<td>Design tokens for Protocol, Mozilla’s design system</td>
</tr>
<tr>
<td>Version</td>
<td><a href="https://github.com/mozilla/protocol-tokens/CHANGELOG.md">1.2.1</a></td>
</tr>
</table>

## Installation

Protocol design tokens are available as an npm package (`@mozilla-protocol/tokens`) on [npm](https://www.npmjs.com/).

The recommended way to use and install design tokens may vary depending on your project; the most common are documented below.

### JavaScript package installation

Using [npm](https://www.npmjs.com/):

```
npm install @mozilla-protocol/tokens --save
```

Using [yarn](https://yarnpkg.com/en/):

```
yarn add @mozilla-protocol/tokens
```

### JavaScript

In JavaScript, design token names are formatted in [lower camelCase](http://wiki.c2.com/?CamelCase).

```js
const tokens = require('@mozilla-protocol/tokens/dist/index');
console.log(tokens.colorBlueLighter); // rgb(0, 0, 0)
```

In JSON, design token names are formatted in [kebab-case](http://wiki.c2.com/?KebabCase).

```js
const tokens = require('@mozilla-protocol/tokens/dist/index.json');
console.log(tokens['color-black']); // rgb(0, 0, 0)
```

### Sass

Sass variables and map keys are formatted in [kebab-case](http://wiki.c2.com/?KebabCase).

```scss
// Using variables
@import '~@mozilla-protocol/tokens/dist/index';

a {
  color: $color-black;
}
```

### Sass, with CSS Custom Properties

Custom properties are formatted in [kebab-case](http://wiki.c2.com/?KebabCase).

```scss
// Omit .css at the end of the file
@import '~@mozilla-protocol/tokens/dist/colors/colors.custom-properties';

a {
  color: var(--color-black);
}
```

## Contributing

### [Code of conduct](https://www.mozilla.org/en-US/about/governance/policies/participation/)

We have a [code of conduct](https://www.mozilla.org/en-US/about/governance/policies/participation/),
please follow it in all your interactions with the project.

### [Contributing guide](https://github.com/mozilla/protocol-tokens/blob/master/CONTRIBUTING.md)

Read the [contributing guide](https://github.com/mozilla/protocol-tokens/blob/master/CONTRIBUTING.md)
to learn how to propose changes and understand our development process.

### [License](https://github.com/mozilla/protocol-tokens/blob/master/LICENSE.md)

The protocol-tokens project is available under the [MPL-2.0](https://github.com/mozilla/protocol-tokens/blob/master/LICENSE.md).
