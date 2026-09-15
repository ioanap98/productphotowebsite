import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mark sharp as external so it isn't bundled into serverless functions
  serverExternalPackages: ['sharp'],
  // Turbopack configuration for Turbopack bundler
  turbopack: {},
  async headers() {
    return [{
      source: '/generated/hero/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }];
  },
  // Optimize static generation
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },
};

export default nextConfig;
