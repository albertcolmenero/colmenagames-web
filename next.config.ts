import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      { source: "/new_website", destination: "/", permanent: true },
      { source: "/new_website/ca", destination: "/ca", permanent: true },
      { source: "/new_website/en", destination: "/en", permanent: true },
      { source: "/new_website/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
