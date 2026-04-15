import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      // Force browser builds of @react-pdf packages
      config.resolve.alias = {
        ...config.resolve.alias,
        "@react-pdf/pdfkit": resolve(
          __dirname,
          "node_modules/@react-pdf/pdfkit/lib/pdfkit.browser.js"
        ),
      };
    }
    return config;
  },
};

export default nextConfig;
