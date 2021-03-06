const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: __dirname + "/app/app.js",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
      contentBase: "./dist",
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: 7700,
  } ,
  module: {
      loaders: [
          {
              test: /\.jsx?$/, exclude: [/node_modules/, /bower_components/], loader: 'babel-loader'
          },
          {
              test: /\.css$/, loader: ExtractTextPlugin.extract(
                  {
                      fallback: 'style-loader',
                      use: ['css-loader', 'sass-loader']
                  }
              )
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          hash: true,
          template: __dirname + "/app/index.tmpl.html",
          inject: 'body'
      }),
      new webpack.BannerPlugin("O'Brian Webpack Setup. Inc"),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("[name]-[hash].css"),
      new webpack.NamedModulesPlugin()
  ]
};
