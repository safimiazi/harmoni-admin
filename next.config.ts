import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "discoverholidaysbd.com",
      "ozvxzsjtzdrrwejjiomf.supabase.co",
      "i.pravatar.cc",
      "res.cloudinary.com", // ✅ FIXED: Removed https://
    ], // Add the domain where your images are hosted
  },
  // Other configuration options can go here
};

export default nextConfig;
