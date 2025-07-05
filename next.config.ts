import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESLint設定
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 環境変数
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  }
};

export default nextConfig;
