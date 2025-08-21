"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  name: string;
  position?: string;
  addLikar?: boolean;
  centerName?: string;
  department?: string;
  experience?: string;
  reviews?: number;
  priceFrom?: number;
  priceOld?: number;
  qualification?: string;
  education?: string;
  courses?: string;
  seminars?: string;
  adress?: string;
  schedule?: string;
  photoUrl?: string;
  photoAlt?: string;
  bio?: string;
  cabinet: string;
  acceptsDeclarations?: boolean | "Так" | "так" | "Ні" | "ні";
};

export default function DoctorProfileClient({
  name,
  position,
  addLikar = false,
  centerName,
  qualification,
  education,
  adress,
  schedule,
  photoUrl,
  photoAlt = name,
  acceptsDeclarations,
  bio,
  cabinet,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
    >
      {/* Фото */}
      {photoUrl && (
        <div
          className="relative shrink-0 -mt-8 lg:-mt-0
                     w-[300px] h-[300px]
                     md:w-[420px] md:h-[420px]
                     lg:w-[850px] lg:h-[850px]
                     lg:-ml-[300px]
                     rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src={photoUrl}
            alt={photoAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Головна інформація */}
      <div className="flex-1 space-y-6 text-base md:text-lg lg:text-xl">
        <header>
          <h1 className="text-3xl lg:text-5xl font-extrabold uppercase leading-tight">
            {name}
          </h1>

          {position && (
            <p className="mt-2 text-xl lg:text-2xl text-[#319c9c] font-semibold">
              {position.split(",").map((d, i, arr) => {
                const title = d.trim();
                const display = addLikar
                  ? `Лікар-${title.toLowerCase()}`
                  : title;
                return (
                  <span key={i}>
                    {display}
                    {i < arr.length - 1 && "; "}
                  </span>
                );
              })}
            </p>
          )}

          {centerName && <p className="mt-1 text-gray-700">{centerName}</p>}
        </header>

        {/* Інформаційні блоки */}
        <div className="space-y-4 text-gray-800 leading-relaxed">
          {/* Кваліфікація */}
          {qualification && (
            <div>
              <h3 className="font-semibold">Кваліфікація:</h3>
              <p>{qualification}</p>
            </div>
          )}

          {/* Освіта */}
          {education && (
            <div>
              <h3 className="font-semibold">Освіта:</h3>
              <p>{education}</p>
            </div>
          )}

          {/* Адреса + Кабінет */}
          {(adress || cabinet) && (
            <div>
              <h3 className="font-semibold">Адреса / Кабінет:</h3>
              <p>
                {adress}
                {adress && cabinet ? ", " : ""}
                {cabinet && `каб. ${cabinet}`}
              </p>
            </div>
          )}

          {/* Графік роботи + лінк */}
          <div>
            <a
              href="/schedule"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 mt-1 inline-block"
            >
              Переглянути розклад лікаря
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
