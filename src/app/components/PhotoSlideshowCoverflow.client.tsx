"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Keyboard,
  EffectCoverflow,
  Thumbs,
  FreeMode,
  A11y,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { ChevronLeft, ChevronRight } from "lucide-react";

export type PhotoItem = {
  id?: string | number;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  href?: string;
};

export default function PhotoSlideshowCoverflow({
  photos,
  className = "",
  autoplayDelay = 3800,
  showCaptions = false,
}: {
  photos: PhotoItem[];
  className?: string;
  autoplayDelay?: number;
  showCaptions?: boolean;
}) {
  // Хуки — зверху, без умов
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);

  if (!photos?.length) return null;

  return (
    <section className={`py-10 md:py-14 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-black to-[#0b1f1e]">
          {/* Навігація */}
          <button
            ref={prevRef}
            aria-label="Попереднє фото"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            ref={nextRef}
            aria-label="Наступне фото"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Головний слайдер */}
          <Swiper
            modules={[
              Autoplay,
              Pagination,
              Keyboard,
              EffectCoverflow,
              Thumbs,
              A11y,
            ]}
            loop
            centeredSlides
            slidesPerView={1.1}
            spaceBetween={24}
            effect="coverflow"
            coverflowEffect={{
              rotate: 28,
              stretch: 0,
              depth: 160,
              modifier: 1,
              slideShadows: false,
            }}
            keyboard={{ enabled: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{ enabled: true }}
            thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 24 },
              768: { slidesPerView: 1.35, spaceBetween: 28 },
              1024: { slidesPerView: 1.6, spaceBetween: 32 },
              1280: { slidesPerView: 1.8, spaceBetween: 36 },
            }}
            className="select-none"
          >
            {photos.map((p, idx) => (
              <SwiperSlide key={p.id ?? p.src}>
                <figure className="relative w-full h-[52vh] md:h-[64vh] lg:h-[72vh] overflow-hidden rounded-xl">
                  <Image
                    src={p.src}
                    alt={p.alt || p.title || `Фото лікарні №${idx + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {showCaptions && (
                    <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold drop-shadow-sm">
                            {p.title || `Фото лікарні №${idx + 1}`}
                          </h3>
                          {p.description && (
                            <p className="mt-1 text-sm md:text-base text-white/90 max-w-3xl">
                              {p.description}
                            </p>
                          )}
                        </div>
                        {p.href && (
                          <Link
                            href={p.href}
                            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 text-sm font-medium hover:bg-white shadow transition"
                          >
                            Детальніше
                          </Link>
                        )}
                      </div>
                    </figcaption>
                  )}
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="px-4 pb-5 pt-3 bg-black/40">
            <Swiper
              modules={[FreeMode, Thumbs, A11y]}
              onSwiper={(s: SwiperType) => setThumbs(s)}
              watchSlidesProgress
              freeMode
              slidesPerView={4}
              spaceBetween={10}
              breakpoints={{
                480: { slidesPerView: 5, spaceBetween: 10 },
                640: { slidesPerView: 6, spaceBetween: 12 },
                1024: { slidesPerView: 8, spaceBetween: 12 },
                1280: { slidesPerView: 10, spaceBetween: 12 },
              }}
              className="thumbs-swiper"
            >
              {photos.map((p, idx) => (
                <SwiperSlide
                  key={`thumb-${p.id ?? p.src}`}
                  className="!h-20 md:!h-24"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg ring-1 ring-white/20 cursor-pointer">
                    <Image
                      src={p.src}
                      alt={p.alt || p.title || `Мініатюра №${idx + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
