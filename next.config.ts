import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mark sharp as external so it isn't bundled into serverless functions
  serverExternalPackages: ['sharp'],
  // Turbopack configuration for Turbopack bundler
  turbopack: {},
  // Optimize static generation
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },
};

export default nextConfig;
