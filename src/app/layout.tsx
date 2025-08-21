// src/app/layout.tsx
import { Ubuntu } from "next/font/google";
import "./globals.css";

import ClientHeader from "./components/ClientHeader";
import Footer from "./components/Footer";

import { AccessibilityProvider } from "./components/AccessibilityContext";
import AccessibilityWidget from "./components/AccessibilityWidget";
import type { Metadata, Viewport } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? // напр. "https://clinic.example.com"
  `https://${process.env.NEXT_PUBLIC_HOSTNAME ?? "178.128.199.216.sslip.io"}`;

export const viewport: Viewport = {
  // один колір
  themeColor: "#5ca59f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `КНП "Сімейна поліклініка" — Чернігів`,
    template: `%s — КНП "Сімейна поліклініка"`,
  },
  description:
    "Офіційний сайт поліклініки: послуги, лікарі, графік прийому, новини та оголошення.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: `КНП "Сімейна поліклініка"`,
    locale: "uk_UA",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: { "application/rss+xml": "/news/rss.xml" }, // якщо маєш RSS
  },
  icons: {
    icon: [
      { url: "/icon-192.png" }, // іконка у вкладці
      // (опц.) { url: "/icon.svg", type: "image/svg+xml" },
      // (опц.) { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icon-192.png", // для iOS
  },

  manifest: "/site.webmanifest",
};

const ubuntu = Ubuntu({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins", // як було раніше
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={ubuntu.variable}>
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
        {/* Провайдер доступності обгортає увесь контент */}
        <AccessibilityProvider>
          <ClientHeader />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Плаваюча кнопка + панель */}
          <AccessibilityWidget />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
