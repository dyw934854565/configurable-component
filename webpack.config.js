var UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
  mode: 'production',
  entry: {
    admin: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'Admin',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.vue', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new VueLoaderPlugin(),
    new UnminifiedWebpackPlugin()
  ]
}

module.exports = config
