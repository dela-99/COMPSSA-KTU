import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const sharedNextConfig = {
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

export default (phase) => ({
  ...sharedNextConfig,
  // Keep an in-flight dev server isolated from `next build` output.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
