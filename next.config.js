/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost', 'testnet.movr.domains', 'movr.domains'],
  },
  env: {
    NETWORK: process.env.NETWORK,
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: true,
};
