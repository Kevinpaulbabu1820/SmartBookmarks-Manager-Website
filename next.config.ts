import type { NextConfig } from "next";

// Ensure Turbopack resolves modules from this package directory (avoids parent workspace root inference)
const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
