module.exports = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  loaders: {
    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
    // the "scss" and "sass" values for the lang attribute to the right configs here.
    // other preprocessors should work out of the box, no loader config like this necessary.
    'scss': 'vue-style-loader!css-loader!sass-loader',
    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
  }
}
