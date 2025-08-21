// app/public-info/platni-poslugi/page.tsx
import { getStrapiBaseUrl } from "@/utils/strapiBase";

// Щоби Next.js робив SSR і не кешував сторінку
export const dynamic = "force-dynamic";

export default async function PravaPage() {
  const strapiUrl = getStrapiBaseUrl();
  if (!strapiUrl) {
    throw new Error("Не задано STRAPI_URL");
  }

  // 1) Отримуємо Single Type із Strapi
  const res = await fetch(
    `${strapiUrl}/api/prava-ta-obov-yazki?populate=prava`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Strapi API error", res.status, await res.text());
    return (
      <main className="container mx-auto p-4">
        <p className="text-red-600">Помилка завантаження даних: {res.status}</p>
      </main>
    );
  }

  const json = await res.json();

  // 2) У Strapi v5 обʼєкт файлу лежить без додаткового data/attributes
  const tableFile = json.data?.prava;
  if (!tableFile) {
    return (
      <main className="container mx-auto p-4">
        <p className="text-gray-600">Немає файлу для завантаження.</p>
      </main>
    );
  }

  // 3) Будуємо посилання на скачування
  const fileUrl = `${strapiUrl}${tableFile.url}`;
  const fileName = tableFile.name;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Права та обовʼязки пацієнтів</h1>
      <a
        href={fileUrl}
        download={fileName}
        className="
          inline-block
          px-6 py-3
          bg-blue-600 text-white font-medium
          rounded-lg hover:bg-blue-700
          transition
        "
      >
        Завантажити ({fileName})
      </a>
    </main>
  );
}
