const { i18n } = require('./next-i18next.config.js');

module.exports = {
    reactStrictMode: true, // ReactのStrictモードを有効にする
    images: {
      domains: ['example.com'], // 外部ドメインからの画像を許可する場合
    },
    experimental: {
      typedRoutes: true,
    },
  i18n,
};