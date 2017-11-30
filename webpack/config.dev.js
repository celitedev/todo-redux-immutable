/* eslint-disable global-require */
const webpack = require('webpack');
const { BUILD_DIR, SRC_DIR } = require('./constants');

const config = {
  name: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    `${SRC_DIR}index.js`
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loaders: ['babel-loader']
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-url'),
                require('postcss-assets'),
                require('precss'),
                require('postcss-cssnext')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  devtool: 'source-map'
};

module.exports = config;
