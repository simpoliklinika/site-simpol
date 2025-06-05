import Link from "next/link";
import { PhoneCall, Clock, MapPin } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import Image from "next/image";

export default function ViddilennyaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={45} height={45} />
            <span className="text-1xl font-bold text-primary">
              КНП "Сімейна Поліклініка" Чернігівської міської ради
            </span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Головна
                </Link>
              </li>
              <li>
                <Link
                  href="/viddilennya"
                  className="text-gray-600 hover:text-primary"
                >
                  Відділення
                </Link>
              </li>
              <li>
                <Link
                  href="/likari"
                  className="text-gray-600 hover:text-primary"
                >
                  Лікарі
                </Link>
              </li>
              <li>
                <Link
                  href="/administration"
                  className="text-gray-600 hover:text-primary"
                >
                  Адміністрація
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Відділення</h1>
        <p className="text-gray-600">
          Тут буде інформація про адміністрацію медичного закладу...
        </p>
      </div>
    </div>
  );
}
