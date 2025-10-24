import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    additionalData: `@use "@/styles/variables" as *;`,
  },
};

export default nextConfig;
