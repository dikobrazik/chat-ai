import type { NextConfig } from "next";
import analyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.yandex.net",
        pathname: "/get-yapic/**",
      },
    ],
  },
  sassOptions: {
    includePaths: ["./src/styles"],
    additionalData: `@use "@/styles/variables" as *;`,
  },
};

export default withBundleAnalyzer(nextConfig);
