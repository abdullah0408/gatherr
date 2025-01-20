import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: { dynamic: 30 },
  },
  images: {
    domains: ["img.clerk.com"], // Allow images from img.clerk.com only
  },
};

export default nextConfig;
