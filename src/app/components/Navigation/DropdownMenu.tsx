"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      {/* Вся область реагує на наведення */}
      <button className="text-gray-700 hover:text-primary font-semibold px-2 py-2">
        Про нас
      </button>

      <div
        className={`absolute bg-white shadow-lg mt-2 rounded-md py-2 w-64 z-50 transition-all duration-200 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {[
          { label: "Історія закладу", href: "/about" },
          { label: "Новини", href: "/news" },
          { label: "Повідомлення", href: "/announcements" },
          { label: "Основні напрямки діяльності", href: "/activities" },
          { label: "Пакети медичних послуг", href: "/packages" },
          { label: "Програма медичних гарантій", href: "/medical-programs" },
          { label: "Фотогалерея", href: "/gallery" },
          { label: "Вакансії", href: "/vacancies" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
