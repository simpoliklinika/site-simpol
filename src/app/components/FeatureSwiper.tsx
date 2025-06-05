// src/app/components/FeatureSwiper.tsx
"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Цілодобова робота",
    img: "/doctors-hospital-design-videoSixteenByNineJumbo1600.jpg",
    text: "Ми працюємо 24/7 без перерв і вихідних.",
  },
  {
    title: "Екстрена допомога",
    img: "/images.jpeg",
    text: "Телефонуйте — виїжджаємо миттєво.",
  },
  {
    title: "Сучасне обладнання",
    img: "/shutterstock_2374000625-scaled.jpg",
    text: "МРТ, УЗД, цифрова рентгенографія.",
  },
  {
    title: "Професійний персонал",
    img: "/logo.png",
    text: "Наші лікарі — світового рівня.",
  },
];

export default function FeatureSwiper() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.params.navigation.prevEl = prevRef.current;
    swiperRef.current.params.navigation.nextEl = nextRef.current;
    swiperRef.current.navigation.init();
    swiperRef.current.navigation.update();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16">
      <style jsx global>{`
        @import "swiper/css";
        @import "swiper/css/navigation";
        @import "swiper/css/pagination";
      `}</style>

      <div className="container mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(sw) => (swiperRef.current = sw)}
          slidesPerView={1}
          loop
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{
            el: ".swiper-pagination",
            type: "custom",
            renderCustom: (_s, cur, tot) => {
              const c = String(cur).padStart(2, "0");
              const t = String(tot).padStart(2, "0");
              return (
                `<span class=\"text-gray-800 font-semibold\">${c}</span> — ` +
                `<span class=\"text-gray-400 font-semibold\">${t}</span>`
              );
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
                  <button className="mt-4 px-8 py-3 bg-[#319c9c] hover:bg-[#277f7f] text-white font-semibold rounded-full transition">
                    Дізнатись більше
                  </button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl pointer-events-none z-10">
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

        {/* лічильник слайдів */}
        <div className="swiper-pagination absolute bottom-6 left-6 text-lg font-semibold select-none" />

        {/* кнопки навігації */}
        <div className="absolute bottom-6 right-6 flex items-center space-x-3">
          <button
            ref={prevRef}
            aria-label="Попередній слайд"
            className="p-4 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={16} className="pointer-events-none" />
          </button>
          <button
            ref={nextRef}
            aria-label="Наступний слайд"
            className="p-4 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
          >
            <ChevronRight size={16} className="pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
