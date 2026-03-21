import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        // tmdbの作品の画像
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        // supabaseストレージ(ユーザーアイコン)
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!)
          .hostname,
      },
    ],
  },
};

export default nextConfig;
