const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let config = {
  entry: './src/index.js', // entry file
  output: {
    path: path.resolve(__dirname, './build'), // output path
    filename: 'bundle.js' // output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // files ending with .js
        exclude: /(node_modules|bowe_components)/, // exclude the node_modules directory
        loader: 'babel-loader' // use this (babel-core) loader
      },
      {
        test: /\.scss$/, // files ending with .scss
        use: ExtractTextPlugin.extract({ // call plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any css not extracted
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css') // call the ExtractTextPlugin constructor and name our css file
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './build'), // A directory or URL to server the HTML content from
    historyApiFallback: true, // fallback to /index.html for Single Page Application
    inline: true, // inline mode (set false to diable including client scripts (like liverelload))
    open: false, // open defaukt browser while launching
    compress: true,
    port: 3000
  },
  devtool: 'eval-source-map'  // enable devtool for better debugging expirience
}

if (process.env.Node_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      }
    })
    // new UglifyJSPlugin({
    //   test: /\.js($|\?)/i,
    //   exclude: /node_modules/
    // })
  )
}

module.exports = config;
