export type PluginOptions = {
  /**
  Array of tag names to process. All other tags will be skipped.

  @default []

  @example
  ```js
  const posthtml = require('posthtml')
  const mergeInlineLonghand = require('posthtml-postcss-merge-longhand')

  const html = `
    <div style="margin: 0; margin-top: 20px;"></div>
    <p style="margin: 0; margin-top: 10px;"></p>
  `

  posthtml([
    mergeInlineLonghand({tags: ['div']})
  ])
    .process(html)
    .then(result => console.log(result.html))

  // Result:
  // <div style="margin: 0; margin-top: 20px;"></div>
  // <p style="margin: 0; margin-top: 10px;"></p>
  ```
  */
  tags?: string[];
};
