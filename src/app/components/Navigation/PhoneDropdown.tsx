"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Item = { label: string; href: string };

export default function PhoneDropdown({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 100); // 500ms затримки
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium">
        <span>{title}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute top-full left-0 
            mt-1 
            min-w-max        /* мінімальна ширина за вмістом */
            bg-white border rounded shadow-lg 
            z-[999] 
            overflow-hidden
          "
        >
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
