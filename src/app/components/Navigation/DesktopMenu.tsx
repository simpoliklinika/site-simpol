// Navigation/DesktopMenu.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { menuItems } from "./MainMenuItems";

export default function DesktopMenu() {
  const [open, setOpen] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = (i: number) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(i);
  };

  const handleLeave = () => {
    // Add a small delay before closing to allow moving to dropdown
    timeoutRef.current = setTimeout(() => {
      setOpen(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    // Cancel the close timeout when entering dropdown
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    // Close dropdown when leaving the dropdown area
    setOpen(null);
  };

  return (
    <div
      className="
        hidden md:flex
        items-center
        gap-8                     /* великі відступи */
        text-base font-medium     /* трішки більший шрифт */
        text-gray-800 font-sans
      "
    >
      <Link href="/" className="hover:text-primary">
        Головна
      </Link>

      {menuItems.map((section, i) => (
        <div
          key={section.title}
          className="relative"
          onMouseEnter={() => handleEnter(i)}
          onMouseLeave={handleLeave}
        >
          <button className="hover:text-primary">{section.title}</button>

          {open === i && (
            <div
              className="absolute top-full left-0 mt-2 flex flex-col bg-white shadow-lg rounded-md py-2 min-w-[220px] z-50"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
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
    </div>
  );
}
