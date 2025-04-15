import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // بحدد ان الصور هتيجى من اى لينك البروتوكول بتاعو https 
  images:{
    remotePatterns: [{protocol: 'https' , hostname: '**'}],
  }
};

export default nextConfig;
