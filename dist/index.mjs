import postcss from 'postcss';
import safe from 'postcss-safe-parser';
import mergeLonghand from 'postcss-merge-longhand';

const plugin = (options = {}) => (tree) => {
  options.tags = options.tags || [];
  const process = (node) => {
    const tags = new Set(options.tags);
    if (tags.size > 0 && !tags.has(node.tag)) {
      return node;
    }
    if (node.attrs?.style) {
      const { css } = postcss().use(mergeLonghand).process(`div { ${node.attrs.style} }`, { parser: safe });
      node.attrs.style = css.replace(/div {\s|\s}$/gm, "");
    }
    return node;
  };
  return tree.walk(process);
};

export { plugin as default };
