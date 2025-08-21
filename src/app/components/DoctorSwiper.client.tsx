// src/app/components/DoctorSwiper.client.tsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { DoctorCard } from "@/utils/strapi-doctors";

export default function DoctorSwiperClient({
  doctors,
}: {
  doctors: DoctorCard[];
}) {
  if (!doctors.length) return null;

  return (
    <section className="py-16 bg-white overflow-visible pb-20">
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
        >
          {doctors.map((doc) => (
            <SwiperSlide key={doc.id}>
              <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* 
                  На мобілці повністю видно фото:
                  object-contain; 
                  на більших — cover
                */}
                <div className="w-full h-64 relative">
                  <Image
                    src={doc.img}
                    alt={doc.name}
                    fill
                    className="object-contain sm:object-cover object-center"
                  />
                </div>
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
