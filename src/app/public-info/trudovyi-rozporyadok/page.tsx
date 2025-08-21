// app/public-info/trudovyi-rozporyadok/page.tsx
import { getStrapiBaseUrl } from "@/utils/strapiBase";

// Щоби Next.js робив SSR і не кешував сторінку
export const dynamic = "force-dynamic";

export default async function TRPage() {
  const strapiUrl = getStrapiBaseUrl();
  if (!strapiUrl) {
    throw new Error("Не задано STRAPI_URL");
  }

  // 1) Отримуємо Single Type із Strapi
  const res = await fetch(
    `${strapiUrl}/api/pravila-trudovogo-rozporyadku?populate=prava`,
    { cache: "no-store" }
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

  // 2) У Strapi v5 медіа повертається «плоским» обʼєктом
  const file = json?.data?.prava;
  if (!file) {
    return (
      <main className="container mx-auto p-4">
        <p className="text-gray-600">Немає файлу для завантаження.</p>
      </main>
    );
  }

  // 3) Будуємо посилання на скачування
  const fileUrl = `${strapiUrl}${file.url}`;
  const fileName = file.name ?? "document";

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Правила трудового розпорядку</h1>
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
