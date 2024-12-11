/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'example.com', 'randomuser.me'],
  },
};

module.exports = nextConfig;
