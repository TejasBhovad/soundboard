/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*",
      },
    ];
  },
  images: {
    domains: ["robohash.org", "uploadthing.com", "utfs.io"],
  },
};
module.exports = nextConfig;
