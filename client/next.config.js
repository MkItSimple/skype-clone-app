/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "cdn.shopify.com"],
  },
  env: {
    chatAppCurrentUser: "userInfo",
    apiUrl: "http://localhost:8001/api",
    endpoint: "http://localhost:8001",
  },
};

module.exports = nextConfig;
