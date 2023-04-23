const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
var IgnorePlugin = require('webpack').IgnorePlugin;

function getClientEnvironment(configuration) {
  // Grab NODE_ENV and NX_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  const NX_APP = /^NX_/i;

  const raw = Object.keys(process.env)
    .filter((key) => NX_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || configuration,
      }
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config, options, context) => {
  config.plugins.push(
    new webpack.DefinePlugin(getClientEnvironment(context.configuration)),
    new NodePolyfillPlugin()
  );
  config.resolve = {
    ...config.resolve,
    fallback: {
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    },
  }



  config.plugins = [
    ...config.plugins,
    new IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/platform-express',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ];
  return config;
};