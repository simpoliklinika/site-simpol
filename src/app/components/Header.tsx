"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";

import DesktopMenu from "./Navigation/DesktopMenu";
import MobileMenu from "./Navigation/MobileMenu";
import PhoneDropdown from "./Navigation/PhoneDropdown";
import GoogleTranslate from "./GoogleTranslate";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Дані відділень
  const branches = {
    lukianenka: {
      phoneRaw: "+380462670673",
      phonePretty: "+38 (0462) 67-06-73",
      address: "проспект Левка Лукʼяненка 47, Чернігів",
      maps: "https://maps.google.com/?q=проспект Левка Лукʼяненка 47, Чернігів",
      label: "Лукʼяненка",
    },
    pyrohova: {
      phoneRaw: "+380462979797",
      phonePretty: "+38 (0462) 97-97-97",
      address: "вул. Пирогова 15, Чернігів",
      maps: "https://maps.google.com/?q=вул. Пирогова 15, Чернігів",
      label: "Пирогова",
    },
  };

  return (
    <header className="w-full bg-white shadow">
      {/* Верхній ряд: логотип + контакти + перекладач */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        {/* Логотип + назва */}
        <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink">
          <Image
            src="/logo.png"
            alt="Логотип КНП «Сімейна поліклініка»"
            width={40}
            height={40}
            className="flex-shrink-0"
          />
          <div className="hidden md:flex flex-col font-sans text-base font-semibold text-gray-800 leading-tight">
            <span>КНП "Сімейна поліклініка"</span>
            <span>Чернігівської міської ради</span>
          </div>
        </Link>

        {/* Контакти, перекладач та дії */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-shrink-0">
          {/* Телефон (правильні номери та маршрути) */}
          <div className="hidden md:block">
            <PhoneDropdown
              // Показуємо як основний номер — Лукʼяненка
              title={branches.lukianenka.phonePretty}
              items={[
                {
                  label: `Лукʼяненка — ${branches.lukianenka.phonePretty}`,
                  href: `tel:${branches.lukianenka.phoneRaw}`,
                },
                {
                  label: `Пирогова — ${branches.pyrohova.phonePretty}`,
                  href: `tel:${branches.pyrohova.phoneRaw}`,
                },
                {
                  label: `Маршрут до ${branches.lukianenka.address}`,
                  href: branches.lukianenka.maps,
                },
                {
                  label: `Маршрут до ${branches.pyrohova.address}`,
                  href: branches.pyrohova.maps,
                },
                { label: "Екстрений — 103", href: "tel:103" },
              ]}
            />
          </div>

          {/* Google Translate */}
          <div className="block">
            <GoogleTranslate />
          </div>

          {/* Кнопка «Кабінет» */}
          <Link
            href="https://h24.ua/login"
            className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded text-gray-800 hover:bg-gray-100 transition"
            aria-label="Вхід до кабінету пацієнта"
          >
            <User size={20} className="text-gray-600" />
            <span className="font-medium">Кабінет</span>
          </Link>

          {/* Записатися */}
          <Link
            href="https://h24.ua/organizacia/8300-knp-sp-chmr"
            className="px-2 py-2 sm:px-4 bg-[#319c9c] hover:bg-[#277f7f] text-white font-semibold rounded transition text-sm sm:text-base whitespace-nowrap"
            aria-label="Онлайн-запис на прийом"
          >
            <span className="hidden sm:inline">Записатися</span>
            <span className="sm:hidden">Запис</span>
          </Link>

          {/* Гамбургер-меню на мобілці */}
          <button
            className="md:hidden p-2 text-gray-700 flex-shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Відкрити меню"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Навігаційний ряд */}
      <nav className="bg-white border-t">
        <div className="container mx-auto flex flex-wrap items-center px-4 md:px-8 py-6 gap-4 md:gap-8 overflow-visible">
          <DesktopMenu />
        </div>

        {/* Телефони на мобільних (та сама логіка, що й зверху) */}
        <div className="flex items-center justify-center md:hidden pb-4">
          <PhoneDropdown
            title={branches.lukianenka.phonePretty}
            items={[
              {
                label: `Лукʼяненка — ${branches.lukianenka.phonePretty}`,
                href: `tel:${branches.lukianenka.phoneRaw}`,
              },
              {
                label: `Пирогова — ${branches.pyrohova.phonePretty}`,
                href: `tel:${branches.pyrohova.phoneRaw}`,
              },
              {
                label: `Маршрут до ${branches.lukianenka.address}`,
                href: branches.lukianenka.maps,
              },
              {
                label: `Маршрут до ${branches.pyrohova.address}`,
                href: branches.pyrohova.maps,
              },
              { label: "Екстрений — 103", href: "tel:103" },
            ]}
          />
        </div>
      </nav>

      {/* Мобільне меню */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 overflow-auto">
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={() => setMobileOpen(false)}
              aria-label="Закрити меню"
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
