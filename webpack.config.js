const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const sass = require('sass'); // Dart Sass for custom implementation
const webpack = require('webpack'); //for using ProvidePlugin to expose jQuery globally
const HtmlWebpackPlugin = require('html-webpack-plugin'); // for auto regenerate html dynamically during build

module.exports = {
  entry: './src/app.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // Dynamically set mode
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.module\.s?css$/, // For CSS modules
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]', // Generate scoped class names
                namedExport: false, // Ensure default export is used for styles
              },
            },
          },
          {
            loader: 'sass-loader', // Compiles SASS to CSS
            options: {
              implementation: sass, // Use Dart Sass as opposed to Node Sass
              sassOptions: {
                // Enable compatibility for older SCSS syntax
                quietDeps: true, // Suppresses warnings from dependencies
                // Silence deprecation warnings for @import
                deprecation: 'silence', // Equivalent to --silence-deprecation=import
                silenceDeprecations: ['legacy-js-api'], // Silence legacy JS API deprecation warnings
                includePaths: [path.resolve(__dirname, 'node_modules')], // Add node_modules for SCSS imports
              },
            },
          }, 
        ],
      },
      {
        // For global styles
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/, // Exclude CSS modules from global styles
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Handles normal CSS
          {
            loader: 'sass-loader', // Compiles SASS to CSS
            options: {
              implementation: sass, // Use Dart Sass as opposed to Node Sass
              sassOptions: {
                // Enable compatibility for older SCSS syntax
                quietDeps: true, // Suppresses warnings from dependencies
                // Silence deprecation warnings for @import
                deprecation: 'silence', // Equivalent to --silence-deprecation=import
                silenceDeprecations: ['legacy-js-api'], // Silence legacy JS API deprecation warnings
                includePaths: [path.resolve(__dirname, 'node_modules')], // Add node_modules for SCSS imports
              },
            },
          },  
        ],
      },
    ],
  },
  devtool: 'eval-cheap-module-source-map', // Sourcemap for development
  devServer: {
    static: path.join(__dirname, 'public'),
    hot: true, // Enable Hot Module Replacement
    port: 8080, // Customize the port if needed
    historyApiFallback: true //react router will fallback to index.html when it does not find the file
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  optimization: {
    splitChunks: false,
  },
  plugins: [
    //Automatically generates index.html and injects the correct bundle.js
    new HtmlWebpackPlugin({
      template: './public/index.html', // use your existing HTML as a template
      filename: 'index.html', // output filename
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',      // Make jQuery available globally
      jQuery: 'jquery',  // Expose jQuery globally
      Popper: ['popper.js', 'default'], // Expose Popper.js for Bootstrap tooltips & popovers
    }),
    ...(process.env.NODE_ENV === 'development' ? [new BundleAnalyzerPlugin()] : []), // Only include BundleAnalyzerPlugin in development
  ],
  ignoreWarnings: [
    {
      module: /custom-bootstrap\.scss$/, // Match the specific file path
      message: /Sass @import rules are deprecated and will be removed in Dart Sass 3\.0\.0/, // Match the deprecation message
    },
    {
      module: /node_modules\/.*\.(scss|sass)$/, // Ignore warnings from dependencies in node_modules
      message: /deprecation/, // Filter deprecation warnings
    },
  ],
};
