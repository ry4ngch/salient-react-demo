const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const sass = require('sass'); // Dart Sass for custom implementation
const webpack = require('webpack'); // for HMR plugin

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // Sourcemap for development
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true, // clean dev output on rebuild
  },

  module: {
    rules: [
      // Scoped CSS modules
      {
        test: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]', // Generate scope class names
                namedExport: false, //Ensure default export is used for styles
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: true,
              sassOptions: {
                quietDeps: true,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },

      // Global SCSS (not CSS modules)
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: true,
              sassOptions: {
                quietDeps: true,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
    ],
  },

  devServer: {
    static: [
      { directory: path.resolve(__dirname, 'dist') },   // bundle output
      { directory: path.resolve(__dirname, 'public') }, // serves your JSON/assets
    ],
    hot: true,
    port: 8080,
    historyApiFallback: true, // fix for React Router
    open: false, // set to true if you want it to open automatically
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // required for reliable HMR, Ensures hot: true actually applies for dev CSS module
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // disable by default
    }),
  ],

  optimization: {
    runtimeChunk: 'single', // helps prevent HMR invalidation, Reduces module duplication in hot updates
    splitChunks: false,
  },
});
