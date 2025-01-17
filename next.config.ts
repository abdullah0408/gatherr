import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: { dynamic: 30 }, // This experimental feature allows dynamic content to be cached for 30 seconds before it's considered stale and fetched again.
  },
  images: {
    domains: ["*"], // Allow images from all external domains
  },
};

export default nextConfig;
