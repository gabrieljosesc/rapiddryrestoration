/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  // Put the (small) stylesheet in the HTML so first paint does not wait on a
  // second request.
  experimental: { inlineCss: true },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
