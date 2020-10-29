const test = require('ava')
const plugin = require('../lib')
const posthtml = require('posthtml')

const path = require('path')
const {readFileSync} = require('fs')

const fixture = file => readFileSync(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
const expected = file => readFileSync(path.join(__dirname, 'expected', `${file}.html`), 'utf8')

const clean = html => html.replace(/[^\S\r\n]+$/gm, '').trim()

const process = (t, name, options, log = false) => {
  return posthtml([plugin(options)])
    .process(fixture(name))
    .then(result => log ? console.log(result.html) : clean(result.html))
    .then(html => t.is(html, expected(name).trim()))
}

test('Merges longhand inline CSS', t => {
  return process(t, 'sanity')
})

test('Preserves other properties', t => {
  return process(t, 'other-props')
})

test('Works with tags option', t => {
  return process(t, 'tags', {tags: ['div', 'p']})
})
