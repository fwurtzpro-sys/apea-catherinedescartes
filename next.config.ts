import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 stays the default for every image that doesn't pass its own
    // `quality`; 70 is being trialed on a few large photos to cut
    // delivered bytes — see their `quality={70}` prop.
    qualities: [70, 75],
  },
};

export default nextConfig;
