require('dotenv').config();
const { withPlugins } = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const path = require('path');

const nextConfigs = {
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'de'],
  // },
  distDir: 'build',
  reactStrictMode: true,
  // assetPrefix: !debug ? '/out' : '',
  trailingSlash: false,
  env: {
    // API_BASE_URL: process.env.API_BASE_URL || 'http://127.0.0.1:3003/v1',
    STORYBLOK_API_KEY: process.env.STORYBLOK_API_KEY,
    MAILGUN_APIKEY: process.env.MAILGUN_APIKEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAILGUN_NAME_EMAIL: process.env.MAILGUN_NAME_EMAIL,
    MAILGUN_FROM_EMAIL: process.env.MAILGUN_FROM_EMAIL,
    SENDGRID_FUNCTION_ENDPOINT: process.env.SENDGRID_FUNCTION_ENDPOINT,
    REACT_APP_EMAILJS_RECEIVER: process.env.REACT_APP_EMAILJS_RECEIVER,
    REACT_APP_EMAILJS_TEMPLATEID: process.env.REACT_APP_EMAILJS_TEMPLATEID,
    REACT_APP_EMAILJS_USERID: process.env.REACT_APP_EMAILJS_USERID,
    REACT_APP_EMAILJS_SERVICEID: process.env.REACT_APP_EMAILJS_SERVICEID,
  },
  // rewrites() {
  //   return [
  //     // Optional Language
  //     // Query object shape: { lang?: string }
  //     // { source: '/:language', destination: '/:language' },
  //     // { source: '/:language/blog/:slug', destination: '/:language/blog/:slug' },
  //   ];
  // },
  // exportPathMap: async function () {
  //   return {
  //     '/': { page: '/' },
  //     '/th': { page: '/[language]' },
  //   };
  // },
  async rewrites() {
    return [
      {
        source: '/:slug*.html', // Old url with .html
        destination: '/:slug*', // Redirect without .html
      },
      // Optional Language
      // Query object shape: { lang?: string }
      { source: '/:language/contact-us', destination: '/:language/contact-us' },
      {
        source: '/:language/blog',
        destination: '/:language/blog',
      },
      { source: '/:language/about-us', destination: '/:language/about-us' },
      { source: '/:language/brands', destination: '/:language/brands' },
      { source: '/:language/career', destination: '/:language/career' },
      { source: '/:language/our-stories', destination: '/:language/our-stories' },
      {
        source: '/:language/innovation-and-newsroom',
        destination: '/:language/innovation-and-newsroom',
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        webpack: function (config) {
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: '[name].[ext]',
              },
            },
          });
          return config;
        },
      },
    ],
    [
      withFonts,
      {
        webpack(config) {
          config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          });

          return config;
        },
      },
    ],
  ],
  nextConfigs,
);
