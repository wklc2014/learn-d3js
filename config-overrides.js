const { injectBabelPlugin } = require('react-app-rewired');

const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
const rewireProvidePlugin = require('react-app-rewire-provide-plugin');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions()(config, env);

    config = rewireDefinePlugin(config, env, {
      // 'process.env.VERSION': JSON.stringify(require('./package.json').version),
      // 'process.env.LOGIN_OUT': JSON.stringify("alipay"),
      // 'process.env.IS_HTTPS': JSON.stringify("NOT"),
    })

    config = rewireProvidePlugin(config, env, {
      // 'window._': 'lodash',
      // 'window.is': 'is_js',
    })

    return config;
}