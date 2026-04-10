import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.27', 'localhost:3000'],
  async headers() {

    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials", value: "true"
          },
          {
            key: "Access-Control-Allow-Origin", value: "https://doha-farma-v2.vercel.app"
          },
          {
            key: "Access-Control-Allow-Methods", value: "POST"
          },
          {
            key: "Access-Control-Allow-Origin", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Lenght, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ]

  }
};


export default nextConfig;
