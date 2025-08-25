// src/app/components/Footer.tsx
"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  PhoneCall,
  ExternalLink,
  Mail,
} from "lucide-react";

export default function Footer() {
  const branches = [
    {
      id: "lukianenka",
      address: "проспект Левка Лукʼяненка 47, Чернігів",
      phoneRaw: "+380462670673",
      phonePretty: "+38 (0462) 67-06-73",
      mapsUrl:
        "https://maps.google.com/?q=проспект Левка Лукʼяненка 47, Чернігів",
      note: "проспект Левка Лукʼяненка 47",
    },
    {
      id: "pyrohova",
      address: "вул. Пирогова 15, Чернігів",
      phoneRaw: "+380462979797",
      phonePretty: "+38 (0462) 97-97-97",
      mapsUrl: "https://maps.google.com/?q=вул. Пирогова 15, Чернігів",
      note: "вул. Пирогова 15",
    },
  ];

  return (
    <footer className="bg-[#319c9c] text-white">
      {/* товстий зелений блок */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Контакти відділень */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-6">
              Контакти відділень
            </h3>

            <ul className="space-y-6">
              {branches.map((b) => (
                <li key={b.id} className="flex items-start gap-4">
                  <div className="mt-1">
                    <MapPin size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-lg font-medium leading-snug">
                      {b.address}
                    </p>
                    <p className="text-white/90 text-sm mt-1">
                      Телефон ({b.note}):{" "}
                      <a
                        href={`tel:${b.phoneRaw}`}
                        className="underline underline-offset-2 hover:opacity-90"
                        aria-label={`Подзвонити у відділення на ${b.note}`}
                      >
                        {b.phonePretty}
                      </a>
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${b.phoneRaw}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 text-sm font-medium hover:bg-white shadow"
                      >
                        <PhoneCall className="w-4 h-4" />
                        Подзвонити
                      </a>
                      <Link
                        href={b.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 border border-white/20"
                        aria-label={`Маршрут до ${b.address}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Маршрут
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Швидкі контакти */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-6">
              Швидкі дії
            </h3>

            {/* --- Помістили email всередину гриду --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {branches.map((b) => (
                <a
                  key={`cta-${b.id}`}
                  href={`tel:${b.phoneRaw}`}
                  className="group rounded-2xl bg-white/10 border border-white/20 p-4 hover:bg-white/15 transition shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/15 p-2">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-white/80">Реєстратура</div>
                      <div className="font-semibold tracking-wide">
                        {b.phonePretty}
                      </div>
                      <div className="text-xs text-white/75 mt-0.5">
                        {b.note}
                      </div>
                    </div>
                  </div>
                </a>
              ))}

              {/* Електронна пошта — всередині гриду, займає 2 колонки на sm+ */}
              <a
                href="mailto:chdpn1@gmail.com"
                aria-label="Написати на електронну пошту"
                className="group rounded-2xl bg-white/10 border border-white/20 p-4 hover:bg-white/15 transition shadow-sm sm:col-span-2 mt-4 sm:mt-6 w-full"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white/15 p-2 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>

                  <div className="w-full">
                    <div className="text-sm text-white/80">
                      Електронна пошта
                    </div>

                    <div className="font-semibold tracking-wide text-base sm:text-lg mt-1 break-words whitespace-normal w-full">
                      chdpn1@gmail.com
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Соцмережі */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-6">
              Ми в соцмережах
            </h3>
            <p className="text-white/90 mb-4">
              Новини поліклініки, корисні поради та оголошення.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/family_clinic_chernihiv?igsh=ODJqemw5NTNudWh0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 font-medium hover:bg-white shadow"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </Link>
              <Link
                href="https://www.facebook.com/share/16rYmXFs96/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 font-medium hover:bg-white shadow"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </Link>
              <Link
                href="https://youtube.com/channel/UCYu7IUP8xVPQBp6nriP4CRw?si=6blpZcLE6mRfrORV"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 font-medium hover:bg-white shadow"
              >
                <Youtube className="w-5 h-5" />
                YouTube
              </Link>
            </div>
            <p className="text-xs text-white/80 mt-4">
              * Натисніть «Подзвонити» або «Маршрут» біля потрібного відділення.
            </p>
          </div>
        </div>
      </div>

      {/* тонка смужка © */}
      <div className="bg-[#277f7f] text-center text-sm md:text-base py-4 text-white">
        © {new Date().getFullYear()} КНП&nbsp;«Сімейна&nbsp;поліклініка ЧМР»{" "}
        Developed by{" "}
        <a
          href="https://www.facebook.com/ilya.khurtak.9/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 rounded-sm"
        >
          Illia Khurtak
        </a>
      </div>
    </footer>
  );
}
