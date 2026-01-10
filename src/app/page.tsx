import Image from "next/image";
import PromoSlider from "@/components/FeatureSwiper";
import StatsSection from "./components/StatsSection";
import DoctorSwiper from "@/components/DoctorSwiper"; // Якщо використовується
import ServiceCards from "@/components/ServiceCards";
import LatestNews from "@/components/LatestNews";
import { toAbs } from "@/utils/toAbs";
import { getStrapiEntries } from "../utils/utils";
import { fetchHomepage } from "@/utils/strapi-homepage";
import NewsContent from "@/components/NewsContent";
import { PhotoItem } from "./components/PhotoSlideshow.client"; // Прибрав PhotoSlideshowClient з імпорту, якщо не юзається прямо тут
import { getHospitalPhotos } from "@/utils/getHospitalPhotos";
import PhotoSlideshowCoverflow from "./components/PhotoSlideshowCoverflow.client";
import MapsSection from "@/components/MapsSection";
import type { Metadata } from "next";

// 👇 Переконайся, що ця функція експортується з твого файлу utils
// Якщо ти створив окремий файл strapi-stats.ts, зміни шлях на "@/utils/strapi-stats"
import { fetchStatsData } from "@/utils/strapi-doctors";

export const dynamic = "force-dynamic";

/* ---------- TYPES ---------- */
export async function generateMetadata(): Promise<Metadata> {
  const photoRec = await getMainPhoto();
  const photo = photoRec?.photo;
  const best = photo?.formats?.medium ?? photo;
  const ogImage = (best?.url && toAbs(best.url)) || "/og/home.jpg";

  return {
    title: `КНП "Сімейна поліклініка" Чернігівської міської ради`,
    description:
      "Послуги, лікарі, графік прийому, новини та оголошення поліклініки Чернігова.",
    alternates: { canonical: "/" },
    openGraph: {
      url: "/",
      title: `КНП "Сімейна поліклініка" — офіційний сайт`,
      description:
        "Послуги, лікарі, графік прийому, новини та оголошення поліклініки Чернігова.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Головне фото поліклініки",
        },
      ],
    },
    twitter: {
      title: `КНП "Сімейна поліклініка" — офіційний сайт`,
      description:
        "Послуги, лікарі, графік прийому, новини та оголошення поліклініки Чернігова.",
      images: [ogImage],
      card: "summary_large_image",
    },
  };
}

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

type MainPhotoRecord = { photo: StrapiMedia };

/* ---------- API CALLS ---------- */

const getMainPhoto = async () => {
  try {
    const res = await getStrapiEntries<MainPhotoRecord>("golovna-fotos", {
      populate: "photo",
      pagination: { page: 1, pageSize: 1 },
      sort: "updatedAt:desc",
      cache: "no-store",
    });
    return res[0] ?? null;
  } catch (e) {
    console.error("Main photo fetch error:", e);
    return null;
  }
};

/* ---------- PAGE ---------- */

export default async function HospitalLandingPage() {
  // 👇 Виконуємо всі запити паралельно для швидкості
  const [photoRec, page, photos, statsData] = await Promise.all([
    getMainPhoto(),
    fetchHomepage(),
    getHospitalPhotos("hospital"),
    fetchStatsData(), // <--- ТУТ ми тягнемо статистику на сервері
  ]);

  /* ---------- HERO SOURCE & SIZE ---------- */
  const photo = photoRec?.photo;
  const best = photo?.formats?.medium ?? photo;

  const heroSrc = best ? toAbs(best.url) : "/photo.png";
  const heroAlt = photo?.alternativeText ?? "Фото поліклініки";
  const heroW = best?.width ?? 600;
  const heroH = best?.height ?? 400;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* ---------------- HERO ---------------- */}
        <section className="bg-[#319c9c] text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                КНП "Сімейна поліклініка" <br /> Чернігівської міської ради
              </h1>
              {page?.content.length ? (
                <NewsContent content={page.content} />
              ) : (
                <p className="text-center text-gray-500">
                  Контент ще не додано.
                </p>
              )}
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

        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mt-8 mb-6 text-center">
              Сучасна поліклініка для тих, хто турбується про своє здоров'я.
            </h2>
            <PhotoSlideshowCoverflow photos={photos} showCaptions={false} />
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Основні напрямки
            </h2>
            <ServiceCards />
          </div>
        </section>

        {/* 👇 Передаємо завантажені дані як initialData */}
        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Статистика поліклініки на {new Date().getFullYear()} рік
            </h2>
            <StatsSection initialData={statsData} />
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Спеціальні пропозиції
            </h2>
            <PromoSlider />
          </div>
        </section>

        <section id="services" className="py-16 bg-white">
          <LatestNews />
        </section>
        <MapsSection />
      </main>
    </div>
  );
}
