"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [showAbout, setShowAbout] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [showPublic, setShowPublic] = useState(false);
  const [showPatients, setShowPatients] = useState(false);

  return (
    <nav className="mt-6 flex flex-col space-y-3 text-gray-800 text-s font-sans">
      <Link href="/">Головна</Link>

      {/* Про нас */}
      <button
        className="flex justify-between items-center text-left"
        onClick={() => setShowAbout(!showAbout)}
      >
        Про нас <span>{showAbout ? "−" : "+"}</span>
      </button>
      {showAbout && (
        <div className="ml-4 flex flex-col space-y-2 text-sm text-gray-600">
          <Link href="/about">Історія закладу</Link>
          <Link href="/news">Новини</Link>
          <Link href="/announcements">Повідомлення (оголошення)</Link>
          <Link href="/activities">Основні напрямки діяльності</Link>
          <Link href="/packages">Пакети медичних послуг</Link>
          <Link href="/medical-programs">Програма медичних гарантій</Link>
          <Link href="/gallery">Фотогалерея</Link>
          <Link href="/vacancies">Вакансії</Link>
        </div>
      )}

      {/* Структура */}
      <button
        className="flex justify-between items-center text-left"
        onClick={() => setShowStructure(!showStructure)}
      >
        Структура <span>{showStructure ? "−" : "+"}</span>
      </button>
      {showStructure && (
        <div className="ml-4 flex flex-col space-y-1 text-sm text-gray-600">
          <Link href="/structure/administration">Адміністрація</Link>
          <Link href="/structure/departments">Відділення</Link>
        </div>
      )}

      <Link href="/schedule">Розклад роботи</Link>
      <Link href="/doctors">Лікарі</Link>

      {/* Публічна інформація */}
      <button
        className="flex justify-between items-center text-left"
        onClick={() => setShowPublic(!showPublic)}
      >
        Публічна інформація <span>{showPublic ? "−" : "+"}</span>
      </button>
      {showPublic && (
        <div className="ml-4 flex flex-col space-y-2 text-sm text-gray-600">
          <Link href="/public/paid">Платні послуги</Link>
          <Link href="/public/licenses">Установчі документи (ліцензія)</Link>
          <Link href="/public/drugs">Залишки лікарських засобів</Link>
          <Link href="/public/procurement">Державні закупівлі</Link>
        </div>
      )}

      {/* Пацієнту */}
      <button
        className="flex justify-between items-center text-left"
        onClick={() => setShowPatients(!showPatients)}
      >
        Пацієнту <span>{showPatients ? "−" : "+"}</span>
      </button>
      {showPatients && (
        <div className="ml-4 flex flex-col space-y-2 text-sm text-gray-600">
          <Link href="/patients/profile">Особистий кабінет</Link>
          <Link href="/patients/rights">Права і обов’язки пацієнтів</Link>
          <Link href="/patients/vaccination">Вакцинація</Link>
          <Link href="/patients/covid">Вакцинація від COVID-19</Link>
          <Link href="/patients/reimbursement">Програма реімбурсації</Link>
          <Link href="/patients/telemedicine">Телемедицина</Link>
          <Link href="/patients/safety">Безбар’єрність</Link>
          <Link href="/patients/idp">Інформація для ВПО</Link>
          <Link href="/patients/cpms">ЦДІКК</Link>
          <Link href="/patients/links">Корисна інформація</Link>
          <Link href="/patients/schedule">Графік прийому громадян</Link>
          <Link href="/patients/contact-form">Форма зворотного зв’язку</Link>
        </div>
      )}

      <Link href="/contact">Контакти</Link>
    </nav>
  );
}
