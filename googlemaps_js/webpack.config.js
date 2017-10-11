var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './public/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'main.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Tree Finder'
      }),
      new CleanWebpackPlugin(['dist']),
      new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 8080,
        server: { baseDir: ['public'] }
      })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
