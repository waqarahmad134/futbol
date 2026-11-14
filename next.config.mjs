/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server build (no static export): API routes need a Node.js server,
  // so `output: "export"` is intentionally off. Deploy with
  // `npm run build` then `npm start` on Hostinger Node.js hosting or
  // Vercel. The old static `out/` deploy no longer applies.
  // Clean URLs: /about -> /about/ (served by the Node server).
  trailingSlash: true,
  // Image optimization stays off; all images are local files in public/.
  images: { unoptimized: true },
  // The repo carries known baseline lint issues in shadcn/ui boilerplate; don't
  // fail the production build on them (run `npm run lint` separately).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
