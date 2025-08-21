"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Keyboard,
  EffectFade,
  A11y,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type PhotoItem = {
  id?: string | number;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  href?: string;
};

export default function PhotoSlideshowClient({
  photos,
  className = "",
  autoplayDelay = 3500,
}: {
  photos: PhotoItem[];
  className?: string;
  autoplayDelay?: number;
}) {
  // ⚠️ Хуки завжди викликаємо безумовно (до будь-яких return)
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0); // 0..1

  if (!photos?.length) return null;

  return (
    <section className={`py-10 md:py-14 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-black">
          {/* Navigation (custom buttons) */}
          <button
            ref={prevRef}
            aria-label="Попереднє фото"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 hover:bg-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            ref={nextRef}
            aria-label="Наступне фото"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 hover:bg-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Autoplay radial timer */}
          <div className="pointer-events-none absolute right-4 top-4 z-20">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 36 36" className="w-10 h-10">
                <path
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray={`${Math.max(0, progress) * 100}, 100`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Keyboard, EffectFade, A11y]}
            effect="fade"
            loop
            keyboard={{ enabled: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            // Вмикаємо навігацію, а реальні елементи підставимо в onInit
            navigation={{ enabled: true }}
            onAutoplayTimeLeft={(_, __, progressFraction) => {
              setProgress(progressFraction);
            }}
            className="select-none"
          >
            {photos.map((p, idx) => (
              <SwiperSlide key={p.id ?? p.src}>
                <figure className="relative w-full h-[52vh] md:h-[64vh] lg:h-[72vh]">
                  {/* Main image */}
                  <Image
                    src={p.src}
                    alt={p.alt || p.title || "Фото лікарні"}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />

                  {/* Overlay gradient & caption */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        {p.title && (
                          <h3 className="text-xl md:text-2xl font-semibold drop-shadow-sm">
                            {p.title}
                          </h3>
                        )}
                        {p.description && (
                          <p className="mt-1 text-sm md:text-base text-white/90 max-w-3xl">
                            {p.description}
                          </p>
                        )}
                      </div>

                      <div className="pointer-events-auto">
                        {p.href ? (
                          <Link
                            href={p.href}
                            className="inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 text-sm font-medium hover:bg-white shadow transition"
                          >
                            Детальніше
                          </Link>
                        ) : (
                          <button
                            onClick={() => setActiveModalIndex(idx)}
                            className="inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 text-sm font-medium hover:bg-white shadow transition"
                          >
                            <Maximize2 className="w-4 h-4" /> Переглянути
                          </button>
                        )}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveModalIndex(null)}
          >
            <div
              className="absolute inset-0 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                className="relative w-full max-w-6xl"
              >
                <button
                  className="absolute -top-12 right-0 text-white/90 hover:text-white inline-flex items-center gap-2"
                  onClick={() => setActiveModalIndex(null)}
                  aria-label="Закрити"
                >
                  <X className="w-6 h-6" /> Закрити
                </button>

                <div className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-black">
                  <Image
                    src={photos[activeModalIndex].src}
                    alt={
                      photos[activeModalIndex].alt ||
                      photos[activeModalIndex].title ||
                      "Фото лікарні"
                    }
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                {(photos[activeModalIndex].title ||
                  photos[activeModalIndex].description) && (
                  <div className="mt-4 text-white/90">
                    {photos[activeModalIndex].title && (
                      <h4 className="text-lg font-semibold">
                        {photos[activeModalIndex].title}
                      </h4>
                    )}
                    {photos[activeModalIndex].description && (
                      <p className="text-sm mt-1">
                        {photos[activeModalIndex].description}
                      </p>
                    )}
                  </div>
                )}

                {photos[activeModalIndex].href && (
                  <div className="mt-4">
                    <Link
                      href={photos[activeModalIndex].href!}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Перейти на сторінку
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
