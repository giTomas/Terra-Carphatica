const webpack = require('webpack');

const config = {

  entry: {
    app: './assets/js/es6/index.js',
  },
  output: {
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',


        query: {
          presets: [
                    'es2015',
                    'stage-0',
                    'stage-1',
                    'stage-3'
                  ]
        }
      }]
    },
    //uglify
    /*plugins: [
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ]*/
}

module.exports = config;
