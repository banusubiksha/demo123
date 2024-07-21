const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['ttf', 'otf', 'png', 'jpg', 'jpeg'], // Include image extensions if needed
  },
  projectRoot: path.resolve(__dirname),
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
