let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [
      new FaviconsWebpackPlugin('./public/assets/logo.png'),
    ],
  },
}
