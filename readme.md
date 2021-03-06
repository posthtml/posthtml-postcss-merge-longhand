<div align="center">
  <img width="150" height="150" title="PostHTML" src="https://posthtml.github.io/posthtml/logo.svg">
  <h1>Merge inline longhand</h1>
  <p>Merge longhand inline CSS into shorthand</p>

  [![Version][npm-version-shield]][npm]
  [![License][license-shield]][license]
  [![Build][travis-ci-shield]][travis-ci]
  [![Downloads][npm-stats-shield]][npm-stats]
</div>

## About

This plugin uses [postcss-merge-longhand](https://github.com/cssnano/cssnano/tree/master/packages/postcss-merge-longhand) to merge longhand CSS properties in `style=""` attributes to shorthand.

Input:

```html
<div style="margin-top: 1px; margin-right: 2px; margin-bottom: 3px; margin-left: 4px;">Test</div>
```

Output:

```html
<div style="margin: 1px 2px 3px 4px;">Test</div>
```

## Install

```
$ npm i posthtml posthtml-postcss-merge-longhand
```

## Usage

```js
const posthtml = require('posthtml')
const mergeInlineLonghand = require('posthtml-postcss-merge-longhand')

const html = '<div style="margin-top: 1px; margin-right: 2px; margin-bottom: 3px; margin-left: 4px;">Test</div>'

posthtml([
    mergeInlineLonghand()
  ])
  .process(html)
  .then(result => console.log(result.html))

  // <div style="margin: 1px 2px 3px 4px;">Test</div>
```

## Options

### `tags`

Type: `array`\
Default: `[]`

Array of tag names to process. All other tags will be skipped.

Example:

```js
const posthtml = require('posthtml')
const mergeInlineLonghand = require('posthtml-postcss-merge-longhand')

const html = `
  <div style="margin-top: 1px; margin-right: 2px; margin-bottom: 3px; margin-left: 4px;">Test</div>
  <p style="margin-top: 1px; margin-right: 2px; margin-bottom: 3px; margin-left: 4px;">Test</p>
`

posthtml([
    mergeInlineLonghand({tags: ['div']})
  ])
  .process(html)
  .then(result => console.log(result.html))

  // <div style="margin: 1px 2px 3px 4px;">Test</div>
  // <p style="margin-top: 1px; margin-right: 2px; margin-bottom: 3px; margin-left: 4px;">Test</p>
```

[npm]: https://www.npmjs.com/package/posthtml-postcss-merge-longhand
[npm-version-shield]: https://img.shields.io/npm/v/posthtml-postcss-merge-longhand.svg
[npm-stats]: http://npm-stat.com/charts.html?package=posthtml-postcss-merge-longhand
[npm-stats-shield]: https://img.shields.io/npm/dt/posthtml-postcss-merge-longhand.svg
[travis-ci]: https://travis-ci.org/posthtml/posthtml-postcss-merge-longhand/
[travis-ci-shield]: https://img.shields.io/travis/posthtml/posthtml-postcss-merge-longhand/master.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/posthtml-postcss-merge-longhand.svg
