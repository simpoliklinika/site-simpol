// components/Navigation/MainMenuItems.ts

export const menuItems = [
  {
    title: "Про нас",
    items: [
      { label: "Історія закладу", href: "/about" },
      { label: "Новини", href: "/news" },
      { label: "Повідомлення", href: "/announcements" },
      { label: "Основні напрямки", href: "/activities" },
      { label: "Пакети послуг", href: "/packages" },
      { label: "Медичні гарантії", href: "/medical-programs" },
      { label: "Фотогалерея", href: "/gallery" },
      { label: "Вакансії", href: "/vacancies" },
    ],
  },
  {
    title: "Структура",
    items: [
      { label: "Адміністрація", href: "/structure/administration" },

      { label: "Відділення", href: "/structure/departments" },
    ],
  },
  {
    title: "Публічна інформація",
    items: [
      { label: "Платні послуги", href: "/public/paid" },
      { label: "Ліцензія", href: "/public/licenses" },
      {
        label: "Залишки лікарських засобів придбаних за кошти бюджету",
        href: "/public/drugs",
      },
      { label: "Державні закупівлі", href: "/public/procurement" },
    ],
  },
  {
    title: "Пацієнту",
    items: [
      { label: "Особистий кабінет", href: "/patients/profile" },
      { label: "Права пацієнтів", href: "/patients/rights" },
      { label: "Вакцинація", href: "/patients/vaccination" },
      { label: "COVID-19", href: "/patients/covid" },
      { label: "Реімбурсація", href: "/patients/reimbursement" },
      { label: "Телемедицина", href: "/patients/telemedicine" },
      { label: "Безбар’єрність", href: "/patients/safety" },
      { label: "Інфо для ВПО", href: "/patients/idp" },
      { label: "ЦДІКК", href: "/patients/cpms" },
      { label: "Посилання", href: "/patients/links" },
      { label: "Графік прийому", href: "/patients/schedule" },
      { label: "Форма зворотного зв’язку", href: "/patients/contact-form" },
    ],
  },
];
