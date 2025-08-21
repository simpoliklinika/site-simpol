/** next.config.js */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['randomuser.me', 'localhost'],
    remotePatterns: [
      // всі файли з Strapi за HTTP
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',      // <- дозволяємо всі шляхи, не тільки /uploads/**
      },
      {
           protocol: 'https',
            hostname: '178.128.199.216.sslip.io',
           port: '',
            pathname: '/**',
           },
      {
        protocol: 'http',
        hostname: '192.168.31.48',
        port: '1337',
        pathname: '/**',
      },
      // із randomuser залишаємо як було
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',              
        pathname: '/api/portraits/**',
      },
    ],
  },
};

module.exports = nextConfig;
