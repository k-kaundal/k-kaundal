const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your Next.js config here (add options below as needed)
  reactStrictMode: false,
  images: {
    domains: ["kaundal.vip", "techcrunch.com", "www.wired.com", "cdn.vox-cdn.com", "o.aolcdn.com"], // add your domains here!
  }
};

module.exports = withPWA(nextConfig);