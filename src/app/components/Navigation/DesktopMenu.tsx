"use client";

import Link from "next/link";
import { menuItems } from "./MainMenuItems";
import { useState } from "react";

export default function DesktopMenu() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setOpenMenuIndex(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenMenuIndex(null);
    }, 200); // затримка 200 мс перед закриттям
    setCloseTimeout(timeout);
  };

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800 font-medium font-sans">
      <Link href="/" className="hover:text-primary">
        Головна
      </Link>

      {menuItems.map((section, index) => (
        <div
          key={section.title}
          className="relative"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <button className="hover:text-primary">{section.title}</button>

          {/* Випадаюче меню */}
          {openMenuIndex === index && (
            <div className="absolute top-full left-0 mt-2 flex flex-col bg-white shadow-lg rounded-md py-2 min-w-[220px] z-50">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      <Link href="/schedule" className="hover:text-primary">
        Розклад роботи
      </Link>
      <Link href="/doctors" className="hover:text-primary">
        Лікарі
      </Link>
      <Link href="/contact" className="hover:text-primary">
        Контакти
      </Link>
    </nav>
  );
}
