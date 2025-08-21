// src/utils/strapiBase.ts

/** Повертає базову адресу Strapi з публічної змінної середовища */
export const getStrapiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!url) {
    throw new Error("Відсутня змінна NEXT_PUBLIC_STRAPI_URL");
  }
  return url;
};