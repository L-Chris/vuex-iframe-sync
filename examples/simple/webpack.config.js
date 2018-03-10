const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
    appFrame: './src/appFrame.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    quiet: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app',
      filename: 'index.html',
      template: 'index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      title: 'appFrame',
      filename: 'appFrame.html',
      template: 'appFrame.html',
      chunks: ['appFrame']
    })
  ]
}