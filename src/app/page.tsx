// src/app/page.tsx -----------------------------------------------------------
import Image from "next/image";
import { notFound } from "next/navigation";
import PromoSlider from "@/components/FeatureSwiper";
import StatsSection from "./components/StatsSection";
import DoctorSwiper from "@/components/DoctorSwiper";
import ServiceCards from "@/components/ServiceCards";
import { getStrapiEntry, getStrapiEntries } from "../utils/utils";

export const dynamic = "force-dynamic";

/* ---------- TYPES ---------- */

type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    large?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    thumbnail?: { url: string; width: number; height: number };
  };
};

type HomepageData = { text: string };

type MainPhotoRecord = { photo: StrapiMedia };

/* ---------- HELPERS ---------- */

const abs = (url = "") =>
  url.startsWith("http") ? url : `http://localhost:1337${url}`; // <— тимчасово без env

/* ---------- API CALLS ---------- */

const getHomepageData = () =>
  getStrapiEntry<HomepageData>("homepages", {
    // без fields / populate → не ловимо 400
    cache: "no-store",
  });

const getMainPhoto = async () => {
  const res = await getStrapiEntries<MainPhotoRecord>("golovna-fotos", {
    populate: "photo",
    pagination: { page: 1, pageSize: 1 },
    sort: "updatedAt:desc",
    cache: "no-store",
  });
  return res[0] ?? null;
};

/* ---------- PAGE ---------- */

export default async function HospitalLandingPage() {
  const [homepage, photoRec] = await Promise.all([
    getHomepageData(),
    getMainPhoto(),
  ]);

  if (!homepage) return notFound();

  const photo = photoRec?.photo;
  const heroSrc = photo
    ? abs(photo.formats?.large?.url ?? photo.url)
    : "/photo.png";
  const heroAlt = photo?.alternativeText ?? "Фото поліклініки";
  const heroW = photo?.formats?.large?.width ?? 600;
  const heroH = photo?.formats?.large?.height ?? 400;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* ---------------- HERO ---------------- */}
        <section className="bg-[#319c9c] text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                КНП "Сімейна Поліклініка" <br /> Чернігівської міської ради
              </h1>
              <p className="text-lg md:text-xl leading-relaxed">
                {homepage.text}
              </p>
            </div>

            <div className="flex-1 flex justify-center">
              <Image
                src={heroSrc}
                alt={heroAlt}
                width={heroW}
                height={heroH}
                className="rounded-xl shadow-2xl object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        </section>

        {/* ---------- Далі контент без змін ---------- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Спеціальні пропозиції
            </h2>
            <PromoSlider />
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4">
            <StatsSection />
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mt-8 mb-6 text-center">
              Наші Лікарі
            </h2>
            <DoctorSwiper />
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4">
            <ServiceCards />
          </div>
        </section>

        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Наші послуги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["1", "2", "3"].map((service) => (
                <div key={service} className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">{service}</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do ea nisi.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Про нашу поліклініку
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
              Сімейна Поліклініка — ваш надійний партнер у питаннях здоровʼя від
              народження до зрілості.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
