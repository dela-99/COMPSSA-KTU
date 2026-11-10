/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: false,
    optimizePackageImports: [
      "@/components/ui",
      "@/components/home",
      "@/data",
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "@radix-ui/react-avatar",
    ],
  },
};

export default nextConfig;
