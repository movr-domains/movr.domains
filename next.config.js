/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost'],
  },
  env: {
    NETWORK: process.env.NETWORK,
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: true,
};
