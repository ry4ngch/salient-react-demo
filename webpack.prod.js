const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.[contenthash].js',
    clean: true, // cleans /public before building
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    // copy every files and folders during production build except for index.html
    // we need assets and images folder here to be copied for some features to work
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/index.html'], // don't copy index.html
            dot: true,                 // Include hidden files (like .htaccess) if any
          },
          noErrorOnMissing: true, // Ignore missing source dirs/files
          force: true,            // Ensures overwrites are allowed
        },
      ],
    }),
  ] 
});