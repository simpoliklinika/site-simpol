"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import DesktopMenu from "./Navigation/DesktopMenu";
import MobileMenu from "./Navigation/MobileMenu";
import PhoneDropdown from "./Navigation/PhoneDropdown";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow">
      {/* Верхний ряд: логотип / телефон / кабинет / кнопка */}
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        {/* Левый блок: логотип + название */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Логотип" width={40} height={40} />
          <div className="font-sans text-sm md:text-base font-semibold text-gray-800">
            <div>КНП “Сімейна Поліклініка”</div>
            <div>Чернігівської міської ради</div>
          </div>
        </Link>

        {/* Правый блок: телефон и кнопки */}
        <div className="flex items-center gap-4">
          {/* Выпадающее меню для телефона */}
          <PhoneDropdown
            title="+38 (0342) 71-28-00"
            items={[
              { label: "Реєстратура", href: "tel:+380342712800" },
              { label: "Екстрений виклик — 103", href: "tel:103" },
            ]}
          />

          {/* Личный кабинет */}
          <Link
            href="/patients/profile"
            className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded text-gray-800 hover:bg-gray-100 transition"
          >
            <Image src="/icons/user.svg" width={20} height={20} alt="Кабінет" />
            <span className="font-medium">Особистий кабінет</span>
          </Link>

          {/* Кнопка “Записатися на прийом” */}
          <Link
            href="/booking"
            className="ml-2 px-4 py-2 bg-[#319c9c] hover:bg-[#277f7f] text-white font-semibold rounded transition"
          >
            Записатися на прийом
          </Link>

          {/* Бургер для мобилки */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Второй ряд: навигация */}
      <nav className="hidden md:flex items-center w-full bg-white border-t px-4 md:px-8 h-[40]">
        + <DesktopMenu />+{" "}
      </nav>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 overflow-auto">
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
            <MobileMenu />
          </div>
        </div>
      )}
    </header>
  );
}
