/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "api.dhrunirealty.in",
      },
      {
        protocol: "https",
        hostname: "dhruni-backend.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
