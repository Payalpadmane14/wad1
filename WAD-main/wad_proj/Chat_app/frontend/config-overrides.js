const webpack = require("webpack");

module.exports = function override(config) {
  // Ensure fallback object exists in resolve configuration
  const fallback = config.resolve.fallback || {};
  
  // Add 'os' module fallback using os-browserify
  try {
    fallback.os = require.resolve("os-browserify/browser");
  } catch (err) {
    console.error("Failed to resolve 'os-browserify/browser':", err);
    // Handle error or fallback to alternative solution
    // For example, provide an empty object or throw an error
    fallback.os = {};
  }

  // Update resolve configuration with fallbacks
  config.resolve.fallback = fallback;

  // Add ProvidePlugin to provide 'process' in browser
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser"
    })
  ]);

  return config;
};
