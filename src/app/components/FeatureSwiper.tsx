// src/app/components/FeatureSwiper.tsx
"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// стилі Swiper імпортуються на верхньому рівні
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Подологічний кабінет",
    img: "/spec_prop/Подологічний кабінет.jpg",
    text: "Кваліфікована допомога у догляді за стопами для здоров’я та комфорту ваших ніг. Номери телефону для довідок або запису +38 096 225 4503, +38 066 895 3975",
  },
  {
    title: "Центр ментального здоровʼя",
    img: "/spec_prop/Центр ментального здоровʼя.jpg",
    text: "Комплексна підтримка психологічного здоров’я дітей. Номери телефону для довідок або запису +38 098 184 4885",
  },
  {
    title: "Відділення водного лікування",
    img: "/spec_prop/Водний блок.jpg",
    text: "Сучасні методи водолікування для покращення фізичного та емоційного стану. Номер телефону для довідок або запису +38 098 810 2747",
  },
  {
    title: "Сольова кімната",
    img: "/spec_prop/Соляна кімната.jpg",
    text: "Сеанси терапії для зміцнення імунітету та покращення дихання.",
  },
  {
    title: "Відділ раннього втручання",
    img: "/spec_prop/Центр раннього втручання.png",
    text: "Рання підтримка та корекційні програми для успішної адаптації дитини.",
  },
  {
    title: '"Хірургія одного дня"',
    img: "/spec_prop/Хірургія одного дня.jpg",
    text: "Сучасні хірургічні малоінвазивні втручання з мінімальним перебуванням та швидким відновленням, що дозволяє повернутися додому того ж дня.",
  },
  {
    title: "Скринінг діабетичної ретинопатії за допомогою платформи CheckEye",
    img: "/spec_prop/CheckEye.jpg",
    text: "Раннє виявлення патології дозволяє запобігти ускладненням і жити повноцінним життям.",
  },
];

export default function FeatureSwiper() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Викликається до внутрішньої ініціалізації Swiper
  const handleBeforeInit = (sw: SwiperType) => {
    // зберігаємо інстанс
    swiperRef.current = sw;

    // гарантуємо об'єкт navigation
    sw.params.navigation = sw.params.navigation || {};
    // якщо refs вже присвоєні — призначаємо, інакше залишимо undefined, але useEffect допризначить пізніше
    sw.params.navigation.prevEl =
      prevRef.current ?? sw.params.navigation.prevEl;
    sw.params.navigation.nextEl =
      nextRef.current ?? sw.params.navigation.nextEl;

    // якщо кастомна пагінація - прив'язка селектора
    if (paginationRef.current) {
      sw.params.pagination = sw.params.pagination || {};
      // @ts-ignore — типізація Swiper для кастомного el іноді строга
      sw.params.pagination.el = paginationRef.current;
    }
  };

  // Після того як DOM змонтований — гарантуємо ініціалізацію навігації (коли refs стали не-null)
  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw) return;

    // перепризначимо посилання на елементи, якщо refs тепер доступні
    if (sw.params.navigation) {
      sw.params.navigation.prevEl =
        prevRef.current ?? sw.params.navigation.prevEl;
      sw.params.navigation.nextEl =
        nextRef.current ?? sw.params.navigation.nextEl;
    } else {
      sw.params.navigation = {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      } as any;
    }

    // Ініціалізуємо/оновлюємо navigation, якщо методи доступні
    if (sw.navigation) {
      if (typeof sw.navigation.init === "function") {
        try {
          sw.navigation.init();
        } catch (e) {
          // ignore init errors
        }
      }
      if (typeof sw.navigation.update === "function") {
        try {
          sw.navigation.update();
        } catch (e) {
          // ignore update errors
        }
      }
    }

    // cleanup: при демонтажі зруйнувати navigation
    return () => {
      const s = swiperRef.current;
      if (s && s.navigation && typeof s.navigation.destroy === "function") {
        try {
          s.navigation.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16">
      <div className="container mx-auto px-4 relative">
        {/* Кастомна пагінація — має бути в DOM до Swiper */}
        <div
          ref={paginationRef}
          className="feature-swiper-pagination absolute bottom-6 left-6 text-lg font-semibold select-none z-40"
        />

        {/* кнопки навігації — теж мають бути в DOM ДО Swiper */}
        <div className="absolute bottom-6 right-6 flex items-center space-x-3 z-50">
          <button
            ref={prevRef}
            type="button"
            aria-label="Попередній слайд"
            className="p-4 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#319c9c]"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={16} className="pointer-events-none" />
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="Наступний слайд"
            className="p-4 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#319c9c]"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={16} className="pointer-events-none" />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onBeforeInit={handleBeforeInit}
          slidesPerView={1}
          loop
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{
            // використаємо el, який ми прив'язали у onBeforeInit (paginationRef)
            type: "custom",
            renderCustom: (_s, cur, tot) => {
              const c = String(cur).padStart(2, "0");
              const t = String(tot).padStart(2, "0");
              return `<span class="text-gray-800 font-semibold">${c}</span> — <span class="text-gray-400 font-semibold">${t}</span>`;
            },
          }}
          className="overflow-visible"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {s.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600">{s.text}</p>
                </div>

                <div className="flex-1 flex justify-center md:justify-start">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden shadow-2xl z-10 md:-ml-6 lg:-ml-10">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      priority
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
