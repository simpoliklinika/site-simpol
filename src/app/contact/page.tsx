"use client";

import Link from "next/link";
import {
  MapPin,
  PhoneCall,
  Clock,
  Navigation,
  Instagram,
  Facebook,
  Youtube,
  CircleAlert,
  ExternalLink,
} from "lucide-react";
import React from "react";

export default function ContactsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Hero />
      <ContactsGrid />
      <HoursAndEmergency />
      <Socials />
      <Maps />
      <SchemaOrg />
    </main>
  );
}

/* ---------------- Hero ---------------- */
const Hero = () => (
  <section className="relative bg-white text-center py-24 md:py-32 overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 space-y-3">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#5ca59f]">
        Контакти та відділення
      </h1>
      <p className="text-gray-600 text-lg">
        Адреси, телефони{" "}
        <span className="whitespace-nowrap">приймальних відділень</span>, години
        роботи та маршрути до нас
      </p>
    </div>

    {/* Wave accent */}
    <div className="absolute bottom-0 left-0 w-full text-[#5ca59f]/20">
      <svg aria-hidden="true" viewBox="0 0 1440 60" className="w-full h-auto">
        <path
          fill="currentColor"
          d="M0 0h1440v40s-138-20-324-20c-186 0-361 15-554 15C370.2 35 0 60 0 60V0Z"
        />
      </svg>
    </div>
  </section>
);

/* -------------- Contacts grid (2 branches) -------------- */
const branches = [
  {
    id: "lukianenka",
    title: "Відділення на просп. Левка Лукʼяненка",
    address: "проспект Левка Лукʼяненка 47, Чернігів",
    phoneRaw: "+380462670673",
    phonePretty: "+38 (0462) 67-06-73",
    note: "Реєстратура",
    maps: "https://maps.google.com/?q=проспект Левка Лукʼяненка 47, Чернігів",
    extraPhones: [
      {
        label: "Довідкова",
        phoneRaw: "+380462952241",
        phonePretty: "+38 (0462) 95-22-41",
      },
    ],
  },
  {
    id: "pyrohova",
    title: "Відділення на вул. Пирогова",
    address: "вул. Пирогова 15, Чернігів",
    phoneRaw: "+380462979797",
    phonePretty: "+38 (0462) 97-97-97",
    note: "Call center",
    maps: "https://maps.google.com/?q=вул. Пирогова 15, Чернігів",
    extraPhones: [
      {
        label: "Запис на прийом",
        phoneRaw: "+380632493839",
        phonePretty: "+38 (063) 249-38-39",
      },
    ],
  },
];

const ContactsGrid = () => (
  <section className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {branches.map((b) => (
        <article
          key={b.id}
          className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6"
        >
          <h3 className="text-2xl font-semibold text-[#2a6f6f]">{b.title}</h3>

          <div className="mt-4 space-y-3 text-gray-800">
            {/* Адреса */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 text-[#319c9c]" />
              <address className="not-italic">{b.address}</address>
            </div>

            {/* Телефони */}
            <div className="flex items-start gap-3">
              <PhoneCall className="w-5 h-5 mt-0.5 text-[#319c9c]" />
              <div>
                <div>
                  <span className="font-medium">{b.note}:</span>{" "}
                  <a
                    href={`tel:${b.phoneRaw}`}
                    className="underline underline-offset-2"
                  >
                    {b.phonePretty}
                  </a>
                </div>

                {b.extraPhones?.length > 0 && (
                  <ul className="mt-2 space-y-1 text-base text-gray-800">
                    {b.extraPhones.map((ep) => (
                      <li key={ep.phoneRaw}>
                        <span className="font-medium">{ep.label}:</span>{" "}
                        <a
                          href={`tel:${ep.phoneRaw}`}
                          className="underline underline-offset-2 text-gray-900"
                        >
                          {ep.phonePretty}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`tel:${b.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#319c9c] hover:bg-[#277f7f] text-white px-4 py-2 font-medium transition"
            >
              <PhoneCall className="w-4 h-4" />
              Подзвонити
            </a>

            {/* зовнішні посилання краще через <a>, а не <Link> */}
            <a
              href={b.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-[#319c9c]/30 text-[#1c4e4e] hover:bg-teal-50 px-4 py-2 font-medium transition"
            >
              <Navigation className="w-4 h-4" />
              Маршрут
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

/* -------------- Hours + Emergency -------------- */
const HoursAndEmergency = () => (
  <section className="container mx-auto px-4 pb-4">
    {/* <div className="grid md:grid-cols-2 gap-6"> */}
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
      <h3 className="text-xl font-semibold text-[#2a6f6f] mb-3">
        Години роботи
      </h3>
      <ul className="space-y-2 text-gray-700">
        <li>
          <b>Пн–Пт:</b> 08:00–18:00
        </li>
        <li>
          <b>Сб:</b> 09:00–17:00
        </li>
        <li>
          <b>Нд:</b> вихідний
        </li>
      </ul>
      <p className="text-sm text-gray-500 mt-3">
        * Можливі зміни у графіку — уточнюйте у реєстратурі.
      </p>
    </div>
    {/* </div> */}
  </section>
);

/* -------------- Socials -------------- */
const Socials = () => (
  <section className="container mx-auto px-4 py-12">
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
      <h3 className="text-xl font-semibold text-[#2a6f6f] mb-4">
        Ми в соцмережах
      </h3>
      <p className="text-gray-700 mb-4">
        Слідкуйте за новинами поліклініки, оголошеннями та порадами.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="https://www.instagram.com/family_clinic_chernihiv/?igsh=ODJqemw5NTNudWh0#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#319c9c] hover:bg-[#277f7f] text-white px-4 py-2 font-medium transition"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
          Instagram
        </Link>
        <Link
          href="https://www.facebook.com/share/16rYmXFs96/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white border border-[#319c9c]/30 text-[#1c4e4e] hover:bg-teal-50 px-4 py-2 font-medium transition"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5" />
          Facebook
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCYu7IUP8xVPQBp6nriP4CRw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white border border-[#319c9c]/30 text-[#1c4e4e] hover:bg-teal-50 px-4 py-2 font-medium transition"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5" />
          YouTube
        </Link>
      </div>
    </div>
  </section>
);

/* -------------- Maps (two embeds) -------------- */
const Maps = () => (
  <section className="container mx-auto px-4 pb-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {branches.map((b) => (
        <div
          key={`map-${b.id}`}
          className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white"
        >
          <div className="px-6 pt-6">
            <h4 className="text-lg font-semibold text-[#2a6f6f]">{b.title}</h4>
            <p className="text-gray-700 mt-1 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[#319c9c]" />
              {b.address}
            </p>
          </div>
          <div className="mt-4">
            {/* Легка embed-карта (можеш замінити на власні координати) */}
            <iframe
              title={`Карта: ${b.address}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                b.address
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="320"
              loading="lazy"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="px-6 pb-6 pt-4">
            <Link
              href={b.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-[#319c9c]/30 text-[#1c4e4e] hover:bg-teal-50 px-4 py-2 font-medium transition"
            >
              <Navigation className="w-4 h-4" />
              Відкрити у Google Maps
              <ExternalLink className="w-4 h-4 opacity-70" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* -------------- JSON-LD for SEO -------------- */
const SchemaOrg = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "КНП «Сімейна поліклініка» Чернігівської міської ради",
    url: "https://your-domain.example/contacts",
    department: branches.map((b) => ({
      "@type": "MedicalClinic",
      name: b.title,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressLocality: "Чернігів",
        addressCountry: "UA",
      },
      telephone: b.phoneRaw,
    })),
    telephone: branches[0].phoneRaw,
    sameAs: [
      "https://www.instagram.com/your_profile",
      "https://www.facebook.com/your_page",
      "https://www.youtube.com/your_channel",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
