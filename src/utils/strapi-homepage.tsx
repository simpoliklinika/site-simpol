import { BlocksContent } from "@strapi/blocks-react-renderer";
import { fetchFromStrapi } from "./utils";

// Використовуємо ту саму змінну оточення, що і в лікарях
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// --- Types ---
export type HomepageFull = { content: BlocksContent };

export interface HeroPhotoData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// --- Helper (як у doctors) ---
const makeAbsoluteUrl = (u: string | undefined) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${BASE_URL}${u}`;
};

// --- API Functions ---

export async function fetchHomepage(): Promise<HomepageFull | null> {
  const res = await fetchFromStrapi<any>("homepage", { cache: "no-store" });
  if (!res?.data) return null;
  const data = res.data.attributes || res.data;
  return { content: data?.text1 ?? [] };
}

// 👇 ОНОВЛЕНА ТА ПОКРАЩЕНА ФУНКЦІЯ
export async function fetchHeroPhoto(): Promise<HeroPhotoData | null> {
  try {
    const res = await fetchFromStrapi<any>("golovna-fotos", {
      populate: "photo", // Важливо!
      sort: "updatedAt:desc",
      pagination: { page: 1, pageSize: 1 },
      cache: "no-store",
    });

    // 1. Отримуємо "сирий" об'єкт (враховуємо, чи це масив, чи об'єкт)
    const rawData = Array.isArray(res?.data) ? res.data[0] : res?.data;
    if (!rawData) return null;

    // 2. Нормалізуємо attributes (Strapi v4 vs v5)
    const attrs = rawData.attributes || rawData;

    // 3. Логіка пошуку фото (ідентична до strapi-doctors.ts)
    const nested = attrs.photo?.data?.attributes; // Глибока вкладеність
    const flat = !nested && attrs.photo; // Плоска структура

    // Якщо фото взагалі немає
    if (!nested && !flat) return null;

    // 4. Шукаємо найкращий URL (medium -> small -> original)
    // Це вирішує проблему, коли "medium" не існує для маленьких картинок
    let finalUrl = "";
    let width = 800;
    let height = 600;
    let alt = "Фото поліклініки";

    if (nested) {
      // Пріоритет: Medium -> Original
      const formats = nested.formats;
      const bestFormat = formats?.medium || formats?.large || nested;

      finalUrl = bestFormat.url;
      width = bestFormat.width || 800;
      height = bestFormat.height || 600;
      alt = nested.alternativeText || alt;
    } else if (flat) {
      // Для спрощеної структури
      const formats = flat.formats;
      const bestFormat = formats?.medium || formats?.large || flat;

      finalUrl = bestFormat.url;
      width = bestFormat.width || 800;
      height = bestFormat.height || 600;
      alt = flat.alternativeText || alt;
    }

    return {
      src: makeAbsoluteUrl(finalUrl),
      alt: alt,
      width: width,
      height: height,
    };
  } catch (error) {
    console.error("❌ Hero photo fetch error:", error);
    return null;
  }
}
