import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
        pathname: '/get-yapic/**',
      }
    ]
  },
  sassOptions: {
    includePaths: ['./src/styles'],
    additionalData: `@use "@/styles/variables" as *;`,
  },
};

export default nextConfig;
