// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  trailingSlash: true,
  basePath: '/surgeon-website',
  assetPrefix: '/surgeon-website/',
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ["./src/scss"],
    silenceDeprecations: ['import', 'legacy-js-api'],
  },
  turbopack: {
    root: './',
  },
};

module.exports = nextConfig;
