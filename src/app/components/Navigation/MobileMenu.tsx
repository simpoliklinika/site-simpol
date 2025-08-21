// app/components/Navigation/MobileMenu.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { menuItems } from "@/components/Navigation/MainMenuItems"; // <- підстав свій шлях, якщо інший

export default function MobileMenu() {
  // будемо зберігати відкриті секції за title
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpen((s) => ({ ...s, [key]: !s[key] }));
  };

  const renderLink = (href: string, label: string) => {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className="block">
        {label}
      </Link>
    );
  };

  return (
    <nav className="mt-6 flex flex-col space-y-3 text-gray-800 text-sm font-sans">
      <Link href="/">Головна</Link>

      {/* Рендеримо секції з menuItems */}
      {menuItems.map((section) => (
        <div key={section.title}>
          <button
            aria-expanded={!!open[section.title]}
            onClick={() => toggle(section.title)}
            className="w-full flex justify-between items-center text-left"
          >
            {section.title} <span>{open[section.title] ? "−" : "+"}</span>
          </button>

          {open[section.title] && (
            <div className="ml-4 flex flex-col space-y-2 text-sm text-gray-600 mt-2">
              {section.items.map((it) => (
                <div key={it.href} className="py-0.5">
                  {renderLink(it.href, it.label)}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Додаткові загальні лінки (якщо в десктопі вони були окремо) */}
      <Link href="/schedule">Розклад роботи</Link>
      <Link href="/doctors">Лікарі</Link>
      <Link href="/contact">Контакти</Link>
    </nav>
  );
}
