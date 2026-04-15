import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@react-pdf/renderer",
    "@react-pdf/pdfkit",
    "@react-pdf/font",
    "@react-pdf/layout",
    "@react-pdf/primitives",
    "@react-pdf/render",
    "@react-pdf/stylesheet",
    "@react-pdf/textkit",
    "@react-pdf/image",
    "@react-pdf/png-js"
  ],
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Force browser builds of @react-pdf packages to avoid ESM default export errors
      config.resolve.alias = {
        ...config.resolve.alias,
        "@react-pdf/pdfkit": resolve(
          process.cwd(),
          "node_modules/@react-pdf/pdfkit/lib/pdfkit.browser.js"
        ),
      };
    }
    return config;
  },
};

export default nextConfig;
