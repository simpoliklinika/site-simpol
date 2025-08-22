// src/app/layout.tsx
import { Ubuntu } from "next/font/google";
import "./globals.css";

import ClientHeader from "./components/ClientHeader";
import Footer from "./components/Footer";

import { AccessibilityProvider } from "./components/AccessibilityContext";
import AccessibilityWidget from "./components/AccessibilityWidget";
import type { Metadata, Viewport } from "next";

/** Робимо URL абсолютним, навіть якщо в env без протоколу */
function ensureAbsolute(u?: string) {
  if (!u) return "https://localhost";
  return u.startsWith("http://") || u.startsWith("https://")
    ? u
    : `https://${u}`;
}

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  `${
    process.env.NEXT_PUBLIC_HOSTNAME
      ? `https://${process.env.NEXT_PUBLIC_HOSTNAME}`
      : "https://178.128.199.216.sslip.io"
  }`;

export const viewport: Viewport = {
  themeColor: "#5ca59f",
};

export const metadata: Metadata = {
  metadataBase: new URL(ensureAbsolute(RAW_SITE_URL)),
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
    types: { "application/rss+xml": "/news/rss.xml" },
  },
  icons: {
    // файли мають існувати у /public
    icon: [
      { url: "/favicon.ico" },
      { url: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "icons/icon-512.png", sizes: "512x512", type: "image/png" }, // фавікон для вкладки/маніфест
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const ubuntu = Ubuntu({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
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
        <AccessibilityProvider>
          <ClientHeader />
          <main className="flex-1">{children}</main>
          <Footer />
          <AccessibilityWidget />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
