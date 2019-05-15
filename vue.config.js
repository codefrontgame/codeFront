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
  publicPath: process.env.NODE_ENV == null
    ? './'
    : process.env.VUE_APP_PUBLIC_PATH,
}
