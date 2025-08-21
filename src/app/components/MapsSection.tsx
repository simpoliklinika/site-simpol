// src/components/MapsSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

type Branch = {
  id: string;
  title: string;
  address: string;
  mapsUrl: string;
};

const defaultBranches: Branch[] = [
  {
    id: "lukianenka",
    title: "Відділення на просп. Левка Лукʼяненка",
    address: "проспект Левка Лукʼяненка 47, Чернігів",
    mapsUrl:
      "https://maps.google.com/?q=проспект Левка Лукʼяненка 47, Чернігів",
  },
  {
    id: "pyrohova",
    title: "Відділення на вул. Пирогова",
    address: "вул. Пирогова 15, Чернігів",
    mapsUrl: "https://maps.google.com/?q=вул. Пирогова 15, Чернігів",
  },
];

export default function MapsSection({
  branches = defaultBranches,
  mapHeight = 320,
}: {
  branches?: Branch[];
  mapHeight?: number;
}) {
  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((b) => (
          <div
            key={`map-${b.id}`}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white"
          >
            <div className="px-6 pt-6">
              <h4 className="text-lg font-semibold text-[#2a6f6f]">
                {b.title}
              </h4>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#319c9c]" />
                {b.address}
              </p>
            </div>

            <div className="mt-4">
              <iframe
                title={`Карта: ${b.address}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  b.address
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height={mapHeight}
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                aria-label={`Карта і місцезнаходження: ${b.address}`}
              />
            </div>

            <div className="px-6 pb-6 pt-4">
              <Link
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-[#319c9c]/30 text-[#1c4e4e] hover:bg-teal-50 px-4 py-2 font-medium transition"
                aria-label={`Відкрити ${b.title} у Google Maps`}
              >
                <Navigation className="w-4 h-4" />
                Відкрити у Google Maps
                <ExternalLink className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
