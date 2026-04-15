import type { NextConfig } from "next";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

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
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]@react-pdf[\\/]/,
      type: "javascript/auto",
    });

    if (!isServer) {
      // Force browser builds of @react-pdf packages
      config.resolve.alias = {
        ...config.resolve.alias,
        "@react-pdf/pdfkit": require.resolve("@react-pdf/pdfkit/lib/pdfkit.browser.js"),
      };
    }
    return config;
  },
};

export default nextConfig;
