/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fallingsun.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
