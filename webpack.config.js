const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const env = process.env.NODE_ENV;

module.exports = [
  /**
   * Webpack config for Client-Side
   */
  {
    entry: path.join(__dirname, 'views', 'app.js'),
    mode: env,
    output: {
      path: __dirname + '/public/assets/js',
      filename: 'app.js'
    },
    optimization: {
      splitChunks: {
        // Must be specified for HtmlWebpackPlugin to work correctly.
        // See: https://github.com/jantimon/html-webpack-plugin/issues/882
        chunks: 'all',
      },
    },
    module: {
      rules: [{
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [path.join(__dirname, 'views')],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ],
    },
    plugins: [
      new Dotenv(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: path.join(__dirname, 'public', 'index.html'),
        template: path.join(__dirname, 'views/template', 'index.html'),
        inject: true,
      }),
    ],
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },

  }
];
