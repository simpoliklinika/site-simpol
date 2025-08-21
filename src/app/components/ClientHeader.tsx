// src/app/components/ClientHeader.tsx
"use client";

import dynamic from "next/dynamic";

// Динамічний імпорт справжнього Header без SSR
const Header = dynamic(() => import("./Header"), { ssr: false });

export default function ClientHeader() {
  return <Header />;
}
