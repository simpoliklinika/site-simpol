"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";

const GalleryPage = () => {
  // TODO: replace demo items with your real image URLs (e.g., from Strapi or /public)
  const images = useMemo(
    () => [
      { src: "/gallery/1-2.jpg", alt: "Галерея — фото 1", w: 1600, h: 1067 },
      { src: "/gallery/2-2.jpg", alt: "Галерея — фото 2", w: 1600, h: 1067 },
      { src: "/gallery/3.jpg", alt: "Галерея — фото 3", w: 1600, h: 1067 },
      { src: "/gallery/4.jpg", alt: "Галерея — фото 4", w: 1600, h: 1067 },
      { src: "/gallery/5.jpg", alt: "Галерея — фото 5", w: 1600, h: 1067 },
      { src: "/gallery/6-2.jpg", alt: "Галерея — фото 6", w: 1600, h: 1067 },
      { src: "/gallery/7.jpg", alt: "Галерея — фото 7", w: 1600, h: 1067 },
      { src: "/gallery/8.jpg", alt: "Галерея — фото 8", w: 1600, h: 1067 },
      { src: "/gallery/9.jpg", alt: "Галерея — фото 9", w: 1600, h: 1067 },
      { src: "/gallery/10.jpg", alt: "Галерея — фото 10", w: 1600, h: 1067 },
      { src: "/gallery/11.jpg", alt: "Галерея — фото 11", w: 1600, h: 1067 },
      { src: "/gallery/12-2.jpg", alt: "Галерея — фото 12", w: 1600, h: 1067 },
      { src: "/gallery/13.jpg", alt: "Галерея — фото 13", w: 1600, h: 1067 },
      { src: "/gallery/14.jpg", alt: "Галерея — фото 14", w: 1600, h: 1067 },
      { src: "/gallery/15.jpg", alt: "Галерея — фото 15", w: 1600, h: 1067 },
      { src: "/gallery/16.jpg", alt: "Галерея — фото 16", w: 1600, h: 1067 },
      { src: "/gallery/17.jpg", alt: "Галерея — фото 17", w: 1600, h: 1067 },
      { src: "/gallery/18.jpg", alt: "Галерея — фото 18", w: 1600, h: 1067 },
      { src: "/gallery/19.jpg", alt: "Галерея — фото 19", w: 1600, h: 1067 },
      { src: "/gallery/20.jpg", alt: "Галерея — фото 20", w: 1600, h: 1067 },
      { src: "/gallery/21.jpg", alt: "Галерея — фото 21", w: 1600, h: 1067 },
      { src: "/gallery/22-2.jpg", alt: "Галерея — фото 22", w: 1600, h: 1067 },
      { src: "/gallery/23.jpg", alt: "Галерея — фото 23", w: 1600, h: 1067 },
      { src: "/gallery/24.jpg", alt: "Галерея — фото 24", w: 1600, h: 1067 },
      { src: "/gallery/25.jpg", alt: "Галерея — фото 25", w: 1600, h: 1067 },
    ],
    []
  );

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Hero />
      <Gallery images={images} />
    </main>
  );
};

const Hero = () => (
  <section
    id="hero"
    className="relative bg-white text-center py-24 md:py-32 overflow-hidden"
  >
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#5ca59f]">
        Галерея
      </h1>
      <p className="text-lg md:text-xl font-light text-[#5ca59f]/90">
        Фото з життя поліклініки
      </p>
    </div>

    {/* Wave accent matching brand color */}
    <div className="absolute bottom-0 left-0 w-full text-[#5ca59f]/20">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v40s-138-20-324-20c-186 0-361 15-554 15C370.2 35 0 60 0 60V0Z"
        />
      </svg>
    </div>
  </section>
);

function Gallery({
  images,
}: {
  images: { src: string; alt?: string; w?: number; h?: number }[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // Focus the close button when modal opens
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  return (
    <section className="flex-1 container mx-auto px-4 py-10 md:py-16 max-w-6xl">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        aria-label="Галерея фото"
      >
        {images.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ca59f]"
            aria-label={`Відкрити зображення ${i + 1}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt ?? `Зображення ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                priority={i < 3}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд зображення у повному розмірі"
          onClick={close}
        >
          {/* Stop bubbling so clicks on the image/buttons don't close the modal */}
          <div
            className="relative w-[92vw] max-w-6xl h-[70vh] md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={images[index]?.src}
              src={images[index]?.src}
              alt={images[index]?.alt ?? "Зображення"}
              fill
              sizes="92vw"
              className="object-contain rounded-xl shadow-2xl"
              priority
            />

            {/* Controls */}
            <button
              ref={closeBtnRef}
              onClick={close}
              className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-2 text-gray-900 shadow ring-1 ring-black/10 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ca59f]"
              aria-label="Закрити"
            >
              ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-gray-900 shadow ring-1 ring-black/10 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ca59f]"
              aria-label="Попереднє"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-gray-900 shadow ring-1 ring-black/10 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ca59f]"
              aria-label="Наступне"
            >
              ›
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-sm text-gray-900 shadow ring-1 ring-black/10">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GalleryPage;
