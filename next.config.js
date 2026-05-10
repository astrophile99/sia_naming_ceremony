/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Display size cap: Next.js will serve optimized WebP versions at these widths.
    // Original full-res is still served on download (via direct fetch).
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      // Only needed while USE_PLACEHOLDER = true (picsum demo images)
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

module.exports = nextConfig;
