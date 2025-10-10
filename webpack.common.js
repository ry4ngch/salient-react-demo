const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',

  module: {
    rules: [
      {
        test: /\.jsx?$/, // handles .js and .jsx files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      // Do NOT define .scss/.css rules here — those belong in dev/prod configs
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // use source HTML instead of dist
      filename: 'index.html',
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],

  // Avoid unnecessary warnings clutter
  ignoreWarnings: [
    {
      module: /custom-bootstrap\.scss$/,
      message: /Sass @import rules are deprecated/,
    },
    {
      module: /node_modules\/.*\.(scss|sass)$/,
      message: /deprecation/,
    },
  ],
};
