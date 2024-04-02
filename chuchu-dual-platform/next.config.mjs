// ESモジュールの構文を使用
/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true, // ReactのStrictモードを有効にする
  images: {
    domains: ['example.com'], // 外部ドメインからの画像を許可する場合
  },
  experimental: {
    typedRoutes: true,
  },
  // 他のカスタム設定...
};
