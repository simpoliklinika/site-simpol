// src/utils/toAbs.ts
import { getStrapiBaseUrl } from "./strapiBase";

export const toAbs = (u: string | undefined | null): string => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  if (u.startsWith("//"))   return `http:${u}`;
  return `${getStrapiBaseUrl()}${u}`;
};