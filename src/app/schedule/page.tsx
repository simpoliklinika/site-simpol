// src/app/rozklad-likariv/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Schedule = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Hero />
      <Content />
    </main>
  );
};

const Hero = () => (
  <section
    id="hero"
    className="relative bg-white text-center py-24 md:py-32 overflow-hidden"
  >
    <div className="max-w-4xl mx-auto px-4 space-y-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#5ca59f]">
        Розклад роботи лікарів
      </h1>
    </div>
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

const Content = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const base =
          process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
        const res = await fetch(
          `${base}/api/rozklad-likariv?populate=schedule`
        );
        const json = await res.json();
        console.log("🗓 schedule.raw:", json);

        // Strapi v5 може віддавати single-type flatten (без attributes)
        // або як у v4: data.attributes.schedule.data
        let mediaArray: any[] = [];

        // v4-подібний
        if (Array.isArray(json.data?.attributes?.schedule?.data)) {
          mediaArray = json.data.attributes.schedule.data;
        }
        // v5-flattened: schedule одразу масив
        else if (Array.isArray(json.data?.schedule)) {
          mediaArray = json.data.schedule;
        }
        // якщо ж schedule — об'єкт з data[]
        else if (Array.isArray(json.data?.schedule?.data)) {
          mediaArray = json.data.schedule.data;
        }

        const urls = mediaArray.map((m) => {
          // або m.attributes (v4), або m (v5)
          const a = m.attributes ?? m;
          const path =
            a.formats?.large?.url ??
            a.formats?.medium?.url ??
            a.formats?.small?.url ??
            a.url;
          return path.startsWith("http") ? path : base + path;
        });

        setImgs(urls);
      } catch (err) {
        console.error("❌ Error loading schedule:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedule();
  }, []);

  if (loading) {
    return <p className="text-center py-16">Завантаження…</p>;
  }
  if (imgs.length === 0) {
    return <p className="text-center py-16">Немає доступного розкладу.</p>;
  }

  return (
    <section className="flex-1 container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imgs.map((src, idx) => (
          <div
            key={idx}
            className="w-full overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={src}
              alt={`Розклад лікарів ${idx + 1}`}
              width={800}
              height={600}
              className="object-cover w-full h-auto"
              priority={idx === 0}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schedule;
