const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
const { CleanPlugin } = require('webpack'); // Optional: cleans /public before build

module.exports = merge(common, {
  mode: 'production',
  devtool: false, // Disable source maps in production for smaller builds
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.[contenthash].js', // Cache-busting file name
    clean: true, // Cleans the output directory automatically (Webpack 5+ feature)
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    // Optional extra cleanup
    new CleanPlugin(),
  ],
});