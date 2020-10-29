'use strict'

const postcss = require('postcss')
const mergeLonghand = require('postcss-merge-longhand')

module.exports = (options = {}) => tree => {
  options.tags = options.tags || []

  const process = node => {
    const tags = new Set(options.tags)

    if (tags.size > 0 && !tags.has(node.tag)) {
      return node
    }

    if (node.attrs && node.attrs.style) {
      const {css} = postcss().use(mergeLonghand).process(`div { ${node.attrs.style} }`)
      node.attrs.style = css.replace(/div {\s|\s}$/gm, '')
    }

    return node
  }

  return tree.walk(process)
}
