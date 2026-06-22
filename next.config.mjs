/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — produces ./out, deployable to any static host (e.g. Hostinger).
  output: "export",
  // Clean URLs: /about -> /about/index.html (served directly by static hosts).
  trailingSlash: true,
  // Static export can't use the Next Image optimization server.
  images: { unoptimized: true },
  // The repo carries known baseline lint issues in shadcn/ui boilerplate; don't
  // fail the production build on them (run `npm run lint` separately).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
