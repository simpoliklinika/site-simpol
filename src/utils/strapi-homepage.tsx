//src/utils/strapi-homepage.tsx

import { BlocksContent } from "@strapi/blocks-react-renderer";
import { fetchFromStrapi } from "./utils";

// --- Types ---

export type HomepageFull = { content: BlocksContent };

export interface HeroPhotoData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// --- Helpers ---

const makeAbsoluteUrl = (url: string) => {
  if (url.startsWith("http")) return url;
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://languages-politics-beliefs-serum.trycloudflare.com";
  return `${base}${url}`;
};

// --- API Functions ---

// 1. Отримання текстового контенту головної сторінки
export async function fetchHomepage(): Promise<HomepageFull | null> {
  // Використовуємо спільну утиліту замість ручного fetch
  const res = await fetchFromStrapi<any>("homepage", {
    cache: "no-store",
  });

  if (!res?.data) {
    console.warn("Homepage data not found");
    return null;
  }

  // Strapi v5: дані можуть бути одразу в data, або в attributes
  const data = res.data.attributes || res.data;

  // Твоє поле називається 'text1', зберігаємо це
  const blocks = data?.text1 as BlocksContent | undefined;

  return { content: blocks ?? [] };
}

// 2. Отримання головного фото (Hero Image)
export async function fetchHeroPhoto(): Promise<HeroPhotoData | null> {
  try {
    // Запит до колекції/типу фотографій
    const res = await fetchFromStrapi<any>("golovna-fotos", {
      populate: "photo", // Важливо: тільки поле photo
      sort: "updatedAt:desc", // Найсвіжіше
      pagination: { page: 1, pageSize: 1 },
      cache: "no-store",
    });

    // Отримуємо перший елемент масиву (якщо це колекція) або об'єкт (якщо Single Type)
    const rawData = Array.isArray(res?.data) ? res.data[0] : res?.data;

    if (!rawData) return null;

    // Strapi v5/v4 універсальний парсинг
    const item = rawData.attributes || rawData;
    const photoField = item.photo?.data?.attributes || item.photo; // Враховуємо і вкладеність, і плоску структуру

    if (!photoField) return null;

    // Вибираємо найкращий формат (medium або оригінал)
    const formats = photoField.formats;
    const bestFormat = formats?.medium || formats?.large || photoField;

    return {
      src: makeAbsoluteUrl(bestFormat.url),
      alt: photoField.alternativeText || "Головне фото поліклініки",
      width: bestFormat.width || 800,
      height: bestFormat.height || 600,
    };
  } catch (error) {
    console.error("❌ Hero photo fetch error:", error);
    return null;
  }
}
