/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost'],
  },
  env: {
    NETWORK: process.env.NETWORK,
  },
  reactStrictMode: true,
};
