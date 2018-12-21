// production config
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonConfig = require('./prod');

module.exports = merge(commonConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});
