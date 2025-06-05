// src/app/layout.tsx
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const poppins = Ubuntu({
  subsets: ["latin", "cyrillic-ext"], // завантажуємо обидві абетки
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "КНП Сімейна Поліклініка",
  description: "Офіційний сайт лікарні",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={poppins.variable}>
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} КНП "Сімейна Поліклініка" ЧМР
          </div>
        </footer>
      </body>
    </html>
  );
}
