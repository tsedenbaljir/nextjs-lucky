/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ["images.unsplash.com", "os.alipayobjects.com"],
    },
    env: { NEXTAUTH_URL: "http://localhost:3000" },
    outputStandalone: true,
    output: "standalone",
  };
  
  module.exports = nextConfig;
  