const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); //Properly minifies JS and removes comments for production.
const sass = require('sass'); // Dart Sass

module.exports = merge(common, {
  mode: 'production',
  devtool: false, // no source map for prod (optional: 'source-map' if debugging styles)

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.[contenthash].js',
    clean: true, // remove old bundles
    assetModuleFilename: 'assets/[hash][ext][query]', // handle images/fonts cleanly
  },

  module: {
    rules: [
      // CSS Modules (.module.scss)
      {
        test: /\.module\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:6]',
              },
              importLoaders: 1,
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: false,
              sassOptions: {
                quietDeps: true,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },

      //  Global SCSS (non-module)
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: false,
              sassOptions: {
                quietDeps: true,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },

      // Optional — handle images/fonts if not already handled in common.js
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // don't create LICENSE.txt
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single', // ensures cache-busting is stable, Prevents invalid cache references when multiple bundles are built.
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),

    // Copy static assets except JS/CSS/HTML
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'public'),
          globOptions: {
            ignore: [
              '**/*.js',
              '**/*.css',
              '**/*.map',
              '**/index.html',
            ],
            dot: true,
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
});
