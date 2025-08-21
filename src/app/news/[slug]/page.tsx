// src/app/news/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { fetchNewsBySlug, type NewsItemFull } from "@/utils/strapi-news";
import NewsContent from "@/components/NewsContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Приводимо будь-що до BlocksContent (або null) */
function toBlocks(content: unknown): BlocksContent | null {
  if (!content) return null;
  if (Array.isArray(content)) return content as BlocksContent; // уже блоки
  if (typeof content === "object") return content as BlocksContent; // об'єкт блоків
  if (typeof content === "string") {
    // може бути JSON-рядок (блоки) або чистий HTML
    try {
      const parsed = JSON.parse(content);
      return parsed as BlocksContent;
    } catch {
      return null; // не JSON — швидше за все HTML: відрендеримо нижче як HTML
    }
  }
  return null;
}

/* SEO */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchNewsBySlug(slug);
  if (!item) return { title: "Новина не знайдена" };
  return {
    title: item.title,
    description: item.short ?? "",
    openGraph: { title: item.title, description: item.short ?? "" },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = (await fetchNewsBySlug(slug)) as NewsItemFull | null;
  if (!item) return notFound();

  const blocks = toBlocks(item.content);

  return (
    <article className="mx-auto max-w-3xl py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{item.title}</h1>

      <time dateTime={item.publishedAt} className="text-gray-500 mb-6 block">
        {new Intl.DateTimeFormat("uk-UA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(item.publishedAt))}
      </time>

      {item.short && <p className="mb-6 text-lg">{item.short}</p>}

      {/* якщо змогли привести до Blocks — рендеримо блоки */}
      {blocks ? (
        <NewsContent content={blocks} />
      ) : typeof item.content === "string" ? (
        // фолбек: якщо це HTML-рядок
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      ) : null}

      {item.photoUrl && (
        <div className="mt-8">
          <Image
            src={item.photoUrl}
            alt={item.title}
            width={800}
            height={450}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      )}
    </article>
  );
}
