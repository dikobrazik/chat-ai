import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.yandex.net",
        pathname: "/get-yapic/**",
      },
      // аватарки пользователей с Google-логином
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
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
    const proxy = process.env.DEV_API_PROXY;
    if (!proxy || process.env.NODE_ENV === "production") return [];
    const base = proxy.replace(/\/$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${base}/api/:path*`,
      },
    ];
  },
};

// bundle-analyzer подключается лениво: next start на проде исполняет этот
// конфиг, а @next/bundle-analyzer — devDependency, его может не быть в образе
export default async () => {
  if (process.env.ANALYZE === "true") {
    const { default: analyzer } = await import("@next/bundle-analyzer");
    return analyzer({ enabled: true })(nextConfig);
  }
  return nextConfig;
};
