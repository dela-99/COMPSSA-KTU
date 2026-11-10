/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: false,
    optimizePackageImports: ["@/components/ui", "@/components/home", "@/data"],
  },
};

export default nextConfig;
