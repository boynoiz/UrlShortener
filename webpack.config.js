const path = require('path');
const glob = require('glob');
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = (env, argv) => ({
  entry: path.join(__dirname, 'views', 'app.js'),
  mode: argv.mode,
  output: {
    path: __dirname + '/public/assets',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: argv.mode === 'production' ? [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          ie8: false,
          ecma: 6,
          parse: {},
          mangle: {},
          output: {
              comments: false,
              beautify: false,
          },
          compress: {
              drop_console: true,
              ecma : 6,
          },
          warnings: false
        }
      }),
    ] : []
  },
  devtool: argv.mode === 'development' ? 'cheap-module-eval-source-map' : undefined,
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
        use: [
          //This plugin should be used only on production builds without style-loader in the loaders chain
          argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
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
      minify: argv.mode === 'production' ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // More options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'development' ? "[name].css" : "[name].[hash].css",
      chunkFilename: argv.mode === 'development' ? "[id].css" : "[id].[hash].css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, 'views') + '/**/*',  { nodir: true }),
    }),
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
});
