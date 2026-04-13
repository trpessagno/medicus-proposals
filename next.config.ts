import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo dejamos esta línea para @react-pdf/renderer
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
