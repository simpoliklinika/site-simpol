/** next.config.js */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ['randomuser.me', 'localhost'], // Це старий метод, краще використовувати remotePatterns знизу
    remotePatterns: [
      // 👇👇👇 ОСЬ ЦЕ ТРЕБА БУЛО ДОДАТИ 👇👇👇
      {
        protocol: 'https',
        hostname: 'adminsimpol.com.ua',
        port: '',
        pathname: '/**',
      },
      // 👆👆👆 КІНЕЦЬ ВАЖЛИВОГО БЛОКУ 👆👆👆

      // Локальна розробка
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      // Random User
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',              
        pathname: '/api/portraits/**',
      },
      // Якщо ти ще використовуєш старі IP або тунелі, нехай будуть, але для продакшена вони не треба:
      {
        protocol: 'https',
        hostname: '**.trycloudflare.com',
      },
    ],
  },
};

module.exports = nextConfig;