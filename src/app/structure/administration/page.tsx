"use client";

import Image from "next/image";
import { useState } from "react";

const ADMIN = [
  {
    position: "Генеральний директор",
    name: "ОВСІЄНКО Людмила Володимирівна",
    phone: null,
    photo: "/administration_photo/зображення_viber_2025-06-25_09-32-36-862.jpg",
  },
  {
    position: "Медичний директор",
    name: "КРЮЧКО Наталія Василівна",
    phone: null,
    photo: "/administration_photo/зображення_viber_2025-06-25_09-32-39-009.jpg",
  },
  {
    position: "Заступник генерального директора з економічних питань",
    name: "ТОВСТОЛІС Наталія Іванівна",
    phone: null,
    photo: "/administration_photo/Товстоліс.jpg",
  },
  {
    position: "Заступник генерального директора з технічних питань",
    name: "ДЕМИДОВ Петро Анатолійович",
    phone: null,
    photo: "/administration_photo/Демидов П.А.jpg",
  },
  {
    position: "Заступник медичного директора",
    name: "КОВАЛЬОВА Катерина Віталіївна",
    phone: null,
    photo: "/administration_photo/Ковальова.jpg",
  },
  {
    position: "Заступник медичного директора",
    name: "ПОЛЯКОВ Роман Валерійович",
    phone: null,
    photo: "/administration_photo/22 Поляков.jpg",
  },
  {
    position: "Головна медична сестра",
    name: "ДЕМИДОВА Ольга Олегівна",
    phone: null,
    photo: "/administration_photo/Демидова О.О.jpg",
  },
  {
    position: "Головний бухгалтер",
    name: "ДЕНИСЕНКО Ніна Михайлівна",
    phone: null,
    photo: "/administration_photo/Денисенко.jpg",
  },
  {
    position: "Начальник відділу кадрів",
    name: "ТКАЧЕНКО Оксана Василівна",
    phone: null,
    photo: "/administration_photo/Ткаченко Оксана Василівна.png",
  },
];

function AdminCard({
  person,
  onClick,
}: {
  person: any;
  onClick: (src: string) => void;
}) {
  return (
    <div
      onClick={() => person.photo && onClick(person.photo)}
      className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition p-4 flex flex-col items-center"
    >
      <div className="w-full aspect-[4/3] relative overflow-hidden rounded-xl">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-6xl text-gray-400">
            👤
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
        <p className="text-sm text-gray-500">{person.position}</p>
        {person.phone && (
          <a
            href={`tel:${person.phone.replace(/-/g, "")}`}
            className="mt-2 inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
          >
            {person.phone}
          </a>
        )}
      </div>
    </div>
  );
}

export default function AdministrationPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <>
      <div className="py-12 bg-gradient-to-b from-teal-50 to-white">
        <h1 className="text-4xl font-bold text-center text-teal-800 mb-8">
          Адміністрація
        </h1>

        {/* 3 колонки на md+ (і залишається 3 на lg/xl) */}
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ADMIN.map((person, idx) => (
            <AdminCard
              key={idx}
              person={person}
              onClick={setSelectedPhoto as any}
            />
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-11/12 md:w-3/4 max-w-3xl aspect-[4/3]">
            <Image
              src={selectedPhoto}
              alt="Enlarged photo"
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
