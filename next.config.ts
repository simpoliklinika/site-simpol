// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /** інші налаштування (якщо будуть) */
  images: {
    /** ✅ сучасний спосіб — remotePatterns (Next 14+) */
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',   // Strapi на локалці
        port: '1337',            // порт Strapi
        pathname: '/uploads/**', // усі файли з /uploads
      },
    ],

    /* 👉 якщо лишаєтесь на старому API, можна замість remotePatterns:
    domains: ['localhost'],
    */
  },
}

export default nextConfig