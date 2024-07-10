'use strict';

const postcss = require('postcss');
const safe = require('postcss-safe-parser');
const mergeLonghand = require('postcss-merge-longhand');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const postcss__default = /*#__PURE__*/_interopDefaultCompat(postcss);
const safe__default = /*#__PURE__*/_interopDefaultCompat(safe);
const mergeLonghand__default = /*#__PURE__*/_interopDefaultCompat(mergeLonghand);

const plugin = (options = {}) => (tree) => {
  options.tags = options.tags || [];
  const process = (node) => {
    const tags = new Set(options.tags);
    if (tags.size > 0 && !tags.has(node.tag)) {
      return node;
    }
    if (node.attrs?.style) {
      const { css } = postcss__default().use(mergeLonghand__default).process(`div { ${node.attrs.style} }`, { parser: safe__default });
      node.attrs.style = css.replace(/div {\s|\s}$/gm, "");
    }
    return node;
  };
  return tree.walk(process);
};

module.exports = plugin;
