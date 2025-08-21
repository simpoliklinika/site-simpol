// src/app/components/LatestNews.tsx
import Link from "next/link";
import { fetchLatestNews, NewsItem } from "@/utils/strapi-news";

export default async function LatestNews() {
  // Просто викликаємо async-функцію без use()
  const news: NewsItem[] = await fetchLatestNews();

  if (!news.length) return null;

  return (
    <section id="latest-news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Останні новини</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {news.map((n) => (
            <article
              key={n.id}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {n.title}
              </h3>

              {n.short && (
                <p className="text-gray-600 line-clamp-3 mb-4">{n.short}</p>
              )}

              <time
                dateTime={n.publishedAt}
                className="block text-sm text-gray-400 mb-4"
              >
                {new Intl.DateTimeFormat("uk-UA").format(
                  new Date(n.publishedAt)
                )}
              </time>

              <Link
                href={`/news/${n.slug}`}
                className="text-[#319c9c] font-medium hover:underline"
              >
                Детальніше →
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-block px-6 py-3 rounded-md bg-[#319c9c] text-white font-semibold shadow hover:bg-[#278484] transition"
          >
            Усі новини
          </Link>
        </div>
      </div>
    </section>
  );
}
