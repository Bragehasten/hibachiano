import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF where the browser supports it, falling back to WebP,
    // then the original format — handled automatically by Next's Image
    // Optimization API based on the request's Accept header.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
