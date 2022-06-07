/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:year(\\d{1,})/:month/:day/:name',
        destination: '/:name', // Matched parameters can be used in the destination
        permanent: true,
      },{
        source: '/tag/:slug',
        destination: '/tag/:slug/page/1', // Matched parameters can be used in the destination
        permanent: false,
      },{
        source: '/search/:phrase',
        destination: '/search/:phrase/page/1', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
