const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    app: './src/app.js',
    appFrame: './src/appFrame.js'
  },
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
          chunks: "initial",
          name: "commons",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
    },
    minimizer: [
			new UglifyJsPlugin({
				sourceMap: false,
				uglifyOptions: {
					compress: {
						warnings: false
					},
					output: {
						comments: false
					},
					warnings: false
				}
			})
    ]
	},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../','docs')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [

    new HtmlWebpackPlugin({
      title: 'app',
      filename: 'index.html',
      template: 'index.html',
      chunks: ['vendor', 'commons', 'app']
    }),
    new HtmlWebpackPlugin({
      title: 'appFrame',
      filename: 'appFrame.html',
      template: 'appFrame.html',
      chunks: ['vendor', 'commons', 'appFrame']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}