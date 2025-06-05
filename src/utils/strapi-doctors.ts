import { getStrapiEntries, getStrapiEntry } from "./utils"

export type Doctor = {
  id: number;
  name: string;
  slug: string;
  position?: string;
  bio?: string;
  photo: {
    url: string;
    alternativeText?: string;
    formats?: { small?: { url: string }; medium?: { url: string } };
  };
};

export const makeAbsoluteUrl = (u = "") =>
  u.startsWith("http")
    ? u
    : `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${u}`;

export const fetchDoctors = () =>
  getStrapiEntries<Doctor>("likars", {
    populate: "photo",
    sort: "priority:asc",
    cache: "no-store",
  });

export const fetchDoctorBySlug = (slug: string) =>
  getStrapiEntry<Doctor>("likars", {
    populate: "photo",
    filters: { slug: { $eq: slug } },
    cache: "no-store",
  });