// components/Navigation/MainMenuItems.ts

export const menuItems = [
  {
    title: "Про нас",
    items: [
      { label: "Історія закладу", href: "/about" },
      { label: "Новини", href: "/news" },
      { label: "Основні напрямки", href: "/activities" },
      { label: "Пакети послуг", href: "/packages" },
      { label: "Програма медичних гарантій", href: "/medical-programs" },
      { label: "Фотогалерея", href: "/gallery" },
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
      {
        label: "Платні послуги",
        href: "/public-info/platni-poslugi",
      },
      { label: "Ліцензія", href: "/public-info/licensy" },
      {
        label: "Залишки лікарських засобів придбаних за кошти бюджету",
        href: "https://eliky.in.ua/hospital/2567",
      },
      {
        label: "Державні закупівлі",
        href: "https://prozorro.gov.ua/uk/search/tender?buyer=04591208&sort=publication_date,desc",
      },
      {
        label: "Правила трудового розпорядку",
        href: "/public-info/trudovyi-rozporyadok",
      },
    ],
  },
  {
    title: "Пацієнту",
    items: [
      { label: "Особистий кабінет", href: "https://h24.ua/login" },
      { label: "Права та обовʼязки пацієнтів", href: "/patients/prava" },
      { label: "Вакцинація", href: "/patients/vaccine" },
      { label: "Реімбурсація", href: "/patients/reimbursement" },
      { label: "Безбар’єрність", href: "/patients/safety" },
      {
        label: "Інфо для ВПО",
        href: "https://bf.diia.gov.ua/articles/medychni-posluhy-dlia-vnutrishno-peremishchenykh-osib",
      },
      { label: "ЦЛКК", href: "/patients/cpms" },
    ],
  },
];
