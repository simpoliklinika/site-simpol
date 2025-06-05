"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type DoctorCard = {
  id: number;
  name: string;
  slug: string;
  specialty?: string;
  img: string;
  alt: string;
};

export default function SpecialistsGrid({
  doctors,
}: {
  doctors: DoctorCard[];
}) {
  /* --- локальний стан --- */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 6;
  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Наші лікарі</h1>

        {/* Пошуковий інпут */}
        <div className="mb-8 text-center">
          <input
            className="px-4 py-2 border rounded w-full max-w-md"
            placeholder="Пошук за ім’ям..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Грід карток */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow flex flex-col overflow-hidden"
            >
              <div className="h-48 relative">
                <Image
                  src={doc.img}
                  alt={doc.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px)100vw, (max-width:1200px)33vw, 300px"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#319c9c]">
                    {doc.name}
                  </h3>
                  {doc.specialty && (
                    <p className="mt-1 text-gray-800">{doc.specialty}</p>
                  )}
                </div>

                <Link
                  href={`/doctors/${doc.slug}`}
                  className="mt-4 inline-block border-2 border-[#319c9c] text-[#319c9c] rounded-full px-4 py-2 text-sm font-medium hover:bg-[#277f7f] hover:text-white transition"
                >
                  Детальніше
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Пагінація */}
        {pageCount > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >
              Попередня
            </button>

            <span>
              {page} / {pageCount}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >
              Наступна
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
