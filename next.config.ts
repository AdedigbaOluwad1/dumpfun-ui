import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "img-v1.raydium.io",
        port: "",
        pathname: "/icon/**",
      },
    ],
  },
};

export default nextConfig;
