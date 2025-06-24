import path from 'node:path'
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {test, expect} from 'vitest'
import posthtml from 'posthtml'
import plugin from '../lib/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fixture = file => readFileSync(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8').trim()
const expected = file => readFileSync(path.join(__dirname, 'expected', `${file}.html`), 'utf8').trim()

const clean = html => html.replace(/[^\S\r\n]+$/gm, '').trim()

const process = (_t, name, options, log = false) => {
  return posthtml([plugin(options)])
    .process(fixture(name))
    .then(result => log ? console.log(result.html) : clean(result.html))
    .then(html => expect(html).toEqual(expected(name)))
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

test('Works with bad CSS', t => {
  return process(t, 'parser')
})
