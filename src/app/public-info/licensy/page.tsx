// app/public-info/platni-poslugi/page.tsx
import { getStrapiBaseUrl } from "@/utils/strapiBase";

export const dynamic = "force-dynamic";

export default async function LicensyPage() {
  const strapiUrl = getStrapiBaseUrl();

  // 1. Логуємо URL запиту
  const apiUrl = `${strapiUrl}/api/liczenziya?populate=*`; // Спробуй зірочку замість назви поля
  console.log("Fetching from:", apiUrl);

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      return (
        <div>
          Error {res.status}: {await res.text()}
        </div>
      );
    }

    const json = await res.json();

    // 2. 👇 ОСЬ ЦЕ НАЙВАЖЛИВІШЕ: Виводимо структуру на екран
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Діагностика Strapi</h1>
        <pre className="bg-gray-100 p-4 rounded overflow-auto border text-xs">
          {JSON.stringify(json, null, 2)}
        </pre>
      </main>
    );
  } catch (e: any) {
    return <div className="text-red-500 p-4">Fetch Error: {e.message}</div>;
  }
}
