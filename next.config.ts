import analyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

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
  // local frontend dev without a local backend: set DEV_API_PROXY=https://jonu.ru
  // and NEXT_PUBLIC_BASE_URL=http://localhost:3000 in .env — the dev server
  // proxies /api/* server-side, so the browser stays same-origin (no CORS).
  // Not set in production env — no effect on prod builds.
  async rewrites() {
    if (!process.env.DEV_API_PROXY) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.DEV_API_PROXY}/api/:path*`,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
