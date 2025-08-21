// src/utils/strapi-news.ts

import { fetchFromStrapi } from "./utils";
import { makeAbsoluteUrl } from "@/utils/strapi-doctors";

// Тип, який ми віддаємо на спискових сторінках (/news та LatestNews)
export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  short?: string;
  publishedAt: string;
};

// Тип для детальної сторінки (/news/[slug])
export type NewsItemFull = {
  id: number;
  title: string;
  slug: string;
  short?: string;
  content?: string;
  publishedAt: string;
  photoUrl?: string;
};

const COLLECTION = "news1";

// --- RAW-тип відповіді Strapi для спискових запитів (fields=…) ---
type RawNewsListItem = {
  id: number;
  title: string;
  slug: string;
  short?: string;
  publishedAt: string;
};

// --- RAW-тип відповіді Strapi для детальної відповіді (populate=photo) ---
type RawNewsDetailItem = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    short?: string;
    content?: string;
    publishedAt: string;
    photo?: {
      data: {
        id: number;
        attributes: {
          url: string;
          formats?: {
            large?: { url: string };
            medium?: { url: string };
            small?: { url: string };
            thumbnail?: { url: string };
          };
        };
      } | null;
    };
  };
};

/** Витяг 4 останніх новин */
export async function fetchLatestNews(): Promise<NewsItem[]> {
  const res = await fetchFromStrapi<{ data: RawNewsListItem[] }>(COLLECTION, {
    fields: "title,slug,short,publishedAt",
    sort: "publishedAt:desc",
    pagination: { pageSize: 4 },
  });

  if (!res?.data?.length) return [];

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    short: item.short,
    publishedAt: item.publishedAt,
  }));
}

/** Витяг усіх новин */
export async function fetchAllNews(): Promise<NewsItem[]> {
  const res = await fetchFromStrapi<{ data: RawNewsListItem[] }>(COLLECTION, {
    fields: "title,slug,short,publishedAt",
    sort: "publishedAt:desc",
  });

  if (!res?.data?.length) return [];

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    short: item.short,
    publishedAt: item.publishedAt,
  }));
}

export async function fetchNewsBySlug(
    slug: string
  ): Promise<NewsItemFull | null> {
    const res = await fetchFromStrapi<{ data: Array<Record<string, any>> }>(
      COLLECTION,
      {
        filters: { slug: { $eq: slug } },
        populate: "*",
        pagination: { pageSize: 1 },
      }
    );
  
    const raw = res?.data?.[0];
    if (!raw) return null;
  
    // 1) Витягуємо базові поля
    const id = raw.id;
    // Якщо Strapi nested:
    const attrs = raw.attributes ?? raw;
  
    // 2) Витяг photoUrl для **flattened** або **nested** структури
    let photoUrl: string | undefined;
  
    // case A: nested under attrs.photo.data.attributes
    const nested = attrs.photo?.data?.attributes;
    if (nested) {
      const urlPath =
        nested.formats?.large?.url ??
        nested.formats?.medium?.url ??
        nested.formats?.small?.url ??
        nested.url;
      photoUrl = makeAbsoluteUrl(urlPath);
    } 
    // case B: flattened on root or under attrs.photo
    else if (attrs.photo?.formats || raw.photo?.formats) {
      const media = attrs.photo ?? raw.photo;
      const urlPath =
        media.formats?.large?.url ??
        media.formats?.medium?.url ??
        media.formats?.small?.url ??
        media.url;
      photoUrl = makeAbsoluteUrl(urlPath);
    }
  
    return {
      id,
      title: attrs.title,
      slug: attrs.slug,
      short: attrs.short,
      content: attrs.content,
      publishedAt: attrs.publishedAt,
      photoUrl,
    };
  }