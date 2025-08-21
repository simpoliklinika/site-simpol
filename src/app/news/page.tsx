import Link from "next/link";
import { fetchAllNews } from "@/utils/strapi-news";

export const dynamic = "force-dynamic";

export default async function NewsIndex() {
  const news = await fetchAllNews();

  return (
    <main className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Усі новини</h1>

        <ul className="space-y-8 max-w-3xl mx-auto">
          {news.map((n) => (
            <li key={n.id} className="border-b pb-6">
              <Link
                href={`/news/${n.slug}`}
                className="text-2xl font-semibold text-[#319c9c] hover:underline"
              >
                {n.title}
              </Link>
              <time
                dateTime={n.publishedAt}
                className="block text-sm text-gray-400 mt-1"
              >
                {new Intl.DateTimeFormat("uk-UA").format(
                  new Date(n.publishedAt)
                )}
              </time>
              {n.short && <p className="text-gray-700 mt-3">{n.short}</p>}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
