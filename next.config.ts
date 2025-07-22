import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações específicas para Leaflet
  experimental: {
    esmExternals: 'loose', // Melhora compatibilidade com módulos ESM
    serverComponentsExternalPackages: ['leaflet', 'react-leaflet'], // Adiciona pacotes do Leaflet
  },

  // Configuração do Webpack para Leaflet
  webpack: (config) => {
    // Fix para o problema de window no Leaflet
    config.resolve.alias = {
      ...config.resolve.alias,
      'leaflet': 'leaflet/dist/leaflet-src.esm.js',
    };

    // Adiciona fallbacks para módulos do Node.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },

  // Configurações de imagens (incluindo marcadores do Leaflet)
  images: {
    domains: [
      'img.icons8.com',
      'cdn-icons-png.flaticon.com',
      'unpkg.com',
      'squad-03-server-production.up.railway.app'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.icons8.com',
      },
      {
        protocol: 'https',
        hostname: '**.flaticon.com',
      },
    ],
  },

  // Configurações de compilação
  compiler: {
    styledComponents: true, // Se estiver usando
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configurações de segurança importantes para Leaflet
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' unpkg.com; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' data: blob: *.tile.openstreetmap.org *.icons8.com *.flaticon.com; connect-src 'self' *.tile.openstreetmap.org",
          },
        ],
      },
    ];
  },
};

export default nextConfig;