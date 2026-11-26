import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  // Images are served as static WebP variants pre-rendered at build time
  // (scripts/generate-image-variants.js + src/lib/imageLoader.ts), not by
  // Vercel's optimizer: its Hobby quota ran out on 26 Nov 2026 and phones got
  // 402s. deviceSizes match the variant widths in src/lib/image-variants.json.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [320, 640, 828, 1200, 1920, 2880],
    qualities: [75, 90],
  },
};

export default nextConfig;
