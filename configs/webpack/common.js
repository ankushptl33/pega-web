// shared config (dev and prod)
const { resolve } = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = mode => {
  const devMode = mode === 'development';

  // eslint-disable-next-line no-console
  console.error(`Dev Mode:${devMode} config: ${mode}`);

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
      },
      extensions: ['.js', '.jsx'],
    },
    context: resolve(__dirname, '../../src'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
          // exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            devMode ? require.resolve('style-loader') : ExtractCssChunks.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            require.resolve('postcss-loader'),
          ],
        },
        {
          test: /\.less$/,
          use: [
            devMode ? require.resolve('style-loader') : ExtractCssChunks.loader,
            {
              loader: require.resolve('css-loader'),
              options: { url: false, sourceMap: false },
            },
            require.resolve('postcss-loader'),
            {
              loader: require.resolve('less-loader'),
              options: {
                relativeUrls: false,
                sourceMap: false,
              },
            },
          ],
        },
        // {
        //   test: /\.scss$/,
        //   use: [
        //     devMode ? 'style-loader' : ExtractCssChunks.loader,
        //     'css-loader',
        //     'postcss-loader',
        //     // 'sass-loader',
        //   ],
        // },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: ['file-loader?name=img/[name].[ext]', 'img-loader'],
        },
        {
          test: /\.(svg)$/i,
          use: ['url-loader?mimetype=image/svg+xml', 'img-loader'],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?mimetype=application/octet-stream',
        },
        // copy Web config file to dist folder
        {
          test: /web.config/,
          loader: 'file-loader?name=[name].[ext]',
        },
      ],
    },
    plugins: [
      new ExtractCssChunks({
        hot: devMode,
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        favicon: 'favicon.ico',
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new ProgressBarPlugin({ summary: false }),
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom',
      jsdom: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react-dom/test-utils': true,
      'react-test-renderer/shallow': true,
    },
    performance: {
      hints: 'warning',
    },
  };
};
