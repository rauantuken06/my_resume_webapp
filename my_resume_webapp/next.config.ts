import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Combine static in folder out/
  output: "export",

  // The dev server is also reachable on this machine's virtual network
  // adapters. Without listing them, Next blocks hot-reload requests that
  // arrive with those origins. Development only; no effect on a production
  // build. Note that Hyper-V reassigns its address on reboot, so if the
  // warning returns with a new IP, add it here or just browse via localhost.
  allowedDevOrigins: [
    "192.168.56.1", // VirtualBox host-only adapter
    "172.17.192.1", // Hyper-V "Default Switch"
  ],
};

export default nextConfig;
