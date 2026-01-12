import Image from "next/image";
import PromoSlider from "@/components/FeatureSwiper";
import StatsSection from "./components/StatsSection";
import ServiceCards from "@/components/ServiceCards";
import LatestNews from "@/components/LatestNews";
import { fetchHomepage } from "@/utils/strapi-homepage"; // Прибрав fetchHeroPhoto
import NewsContent from "@/components/NewsContent";
import { getHospitalPhotos } from "@/utils/getHospitalPhotos";
import PhotoSlideshowCoverflow from "./components/PhotoSlideshowCoverflow.client";
import MapsSection from "@/components/MapsSection";
import type { Metadata } from "next";
import { fetchStatsData } from "@/utils/strapi-doctors";

export const dynamic = "force-dynamic";

/* ---------- STATIC CONFIG ---------- */
// Жорстко задаємо шлях до фото в папці public
const STATIC_HERO_IMAGE = "/main_photo.jpg";

/* ---------- METADATA ---------- */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `КНП "Сімейна поліклініка" Чернігівської міської ради`,
    description:
      "Послуги, лікарі, графік прийому, новини та оголошення поліклініки Чернігова.",
    alternates: { canonical: "/" },
    openGraph: {
      url: "/",
      title: `КНП "Сімейна поліклініка" — офіційний сайт`,
      description: "Послуги, лікарі, графік прийому, новини та оголошення.",
      images: [
        {
          url: STATIC_HERO_IMAGE,
          width: 1200,
          height: 630,
          alt: "Головне фото поліклініки",
        },
      ],
    },
    twitter: {
      title: `КНП "Сімейна поліклініка" — офіційний сайт`,
      description: "Послуги, лікарі, графік прийому, новини та оголошення.",
      images: [STATIC_HERO_IMAGE],
      card: "summary_large_image",
    },
  };
}

/* ---------- PAGE ---------- */

export default async function HospitalLandingPage() {
  // Ми прибрали fetchHeroPhoto(), решта запитів (новини, лікарі) працюють як і раніше
  const [page, photos, statsData] = await Promise.all([
    fetchHomepage(),
    getHospitalPhotos("hospital"),
    fetchStatsData(),
  ]);

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
              {page?.content ? (
                <NewsContent content={page.content} />
              ) : (
                <p className="text-center md:text-left text-white/80">
                  Ми піклуємося про ваше здоров'я.
                </p>
              )}
            </div>

            <div className="flex-1 flex justify-center">
              <Image
                src={STATIC_HERO_IMAGE}
                alt="Фото поліклініки"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl object-cover"
                priority
                // unoptimized ми прибрали, бо для локальних файлів Next.js робить оптимізацію сам
              />
            </div>
          </div>
        </section>

        {/* ---------------- SLIDESHOW ---------------- */}
        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mt-8 mb-6 text-center">
              Сучасна поліклініка для тих, хто турбується про своє здоров'я.
            </h2>
            <PhotoSlideshowCoverflow photos={photos} showCaptions={false} />
          </div>
        </section>

        {/* ---------------- SERVICES ---------------- */}
        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Основні напрямки
            </h2>
            <ServiceCards />
          </div>
        </section>

        {/* ---------------- STATS (Server Side Data) ---------------- */}
        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Статистика поліклініки на {new Date().getFullYear()} рік
            </h2>
            <StatsSection initialData={statsData} />
          </div>
        </section>

        {/* ---------------- PROMO ---------------- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Спеціальні пропозиції
            </h2>
            <PromoSlider />
          </div>
        </section>

        {/* ---------------- NEWS ---------------- */}
        <section id="services" className="py-16 bg-white">
          <LatestNews />
        </section>

        {/* ---------------- MAPS ---------------- */}
        <MapsSection />
      </main>
    </div>
  );
}
