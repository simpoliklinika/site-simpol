// src/app/components/DoctorSwiper.tsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

// Дані лікарів
const doctors = [
  {
    name: "Горелік Валерія Володимирівна",
    specialty: "Ортопед-травматолог дитячий",
    img: "/12.jpg",
    href: "/doctors/1",
  },
  {
    name: "Гуркіна Наталія Василівна",
    specialty: "Педіатр",
    img: "/22.jpg",
    href: "/doctors/2",
  },
  {
    name: "Демиденко Наталія Олександрівна",
    specialty: "Сімейний лікар",
    img: "/33.jpg",
    href: "/doctors/3",
  },
  {
    name: "Дерев'янко Людмила Андріївна",
    specialty: "Дерматовенеролог, дитячий",
    img: "/44.jpg",
    href: "/doctors/4",
  },
  {
    name: "Добрянський Євген Ярославович",
    specialty: "Кардіолог, Терапевт",
    img: "/55.jpg",
    href: "/doctors/5",
  },
  {
    name: "Заболотній Максим Олександрович",
    specialty: "Хірург",
    img: "/6.jpg",
    href: "/doctors/6",
  },
];

export default function DoctorSwiper() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <style jsx global>{`
          .swiper-wrapper {
            align-items: stretch;
          }
        `}</style>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoHeight
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="overflow-visible"
        >
          {doctors.map((doc, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Фото */}
                <div className="w-full h-48 relative">
                  <Image
                    src={doc.img}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Текст і кнопка */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-[#319c9c]">
                      {doc.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-800">
                      {doc.specialty}
                    </p>
                  </div>
                  <Link
                    href={doc.href}
                    className="mt-4 inline-block text-[#319c9c] border-2 border-[#319c9c] rounded-full px-4 py-2 text-sm font-medium hover:bg-[#277f7f] hover:text-white transition"
                  >
                    Детальніше
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
