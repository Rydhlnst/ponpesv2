import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: join(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
