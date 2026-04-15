import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  output: 'standalone',
};

export default nextConfig;
