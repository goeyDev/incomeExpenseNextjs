import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // This will disable ESLint errors from breaking the build
  },
};

export default nextConfig;
