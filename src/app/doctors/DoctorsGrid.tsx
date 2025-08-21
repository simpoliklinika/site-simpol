"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DoctorCard } from "../../types/doctor";

export default function DoctorsGrid({ doctors }: { doctors: DoctorCard[] }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 20;

  // --- ВАЖЛИВО: відсортувати лікарів алфавітно перед усіма операціями ---
  const sortedDoctors = [...doctors].sort((a, b) => {
    const an = (a.name || "").toString();
    const bn = (b.name || "").toString();
    return an.localeCompare(bn, "uk", { sensitivity: "base" });
  });

  // фільтруємо (працюємо з відсортованим списком)
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = sortedDoctors.filter((d) => {
    const name = (d.name ?? d.fullName ?? "").toLowerCase();
    const nameOk = !normalizedSearch || name.includes(normalizedSearch);

    const depOk =
      !department ||
      (d.department ?? "").toLowerCase() === department.toLowerCase();

    const specSource = (d.position ?? d.specialty ?? "").toLowerCase();
    const specOk = !specialty || specSource === specialty.toLowerCase();

    return nameOk && depOk && specOk;
  });

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // опції для селектів теж беремо з відсортованого масиву (щоб порядок був предбачуваний)
  const departments = Array.from(
    new Set(sortedDoctors.map((d) => d.department).filter(Boolean))
  );
  const specialties = Array.from(
    new Set(sortedDoctors.map((d) => d.position).filter(Boolean))
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Наші лікарі</h1>

        {/* --- Пошук + фільтри --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <input
            className="px-4 py-2 border rounded md:w-64"
            placeholder="Пошук за ім’ям…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="px-3 py-2 border rounded md:w-64"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Усі відділення</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-2 border rounded md:w-64"
            value={specialty}
            onChange={(e) => {
              setSpecialty(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Усі спеціалізації</option>
            {specialties.map((sp) => (
              <option key={sp} value={sp}>
                {sp}
              </option>
            ))}
          </select>
        </div>

        {/* --- Ґрід лікарів --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {paged.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-xl shadow flex flex-col overflow-hidden"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={d.photoUrl}
                  alt={d.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#319c9c]">
                    {d.name}
                  </h3>
                  {d.position && <p className="text-gray-800">{d.position}</p>}
                  {d.department && (
                    <p className="text-gray-600 italic">{d.department}</p>
                  )}
                  {d.acceptsDeclarations === "Так" && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Приймає декларації
                    </span>
                  )}
                </div>
                <Link
                  href={`/doctors/${d.slug}`}
                  className="mt-4 inline-block border-2 border-[#319c9c] text-[#319c9c] rounded-full px-4 py-2 text-sm font-medium hover:bg-[#277f7f] hover:text-white transition"
                >
                  Детальніше
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- Пагінація --- */}
        {pageCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >
              Попередня
            </button>
            <span>
              {page}/{pageCount}
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
