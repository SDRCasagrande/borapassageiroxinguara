import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['bcryptjs'],
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'borapassageiroxinguara.com.br',
        '*.borapassageiroxinguara.com.br',
      ]
    }
  }
};

export default nextConfig;
