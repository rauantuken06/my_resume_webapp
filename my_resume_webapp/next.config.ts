import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is also reachable on this machine's Hyper-V "Default Switch"
  // address. Without listing it, Next blocks hot-reload requests that arrive
  // with that origin. Development only; it has no effect on a production build.
  allowedDevOrigins: ["172.17.160.1"],
};

export default nextConfig;
