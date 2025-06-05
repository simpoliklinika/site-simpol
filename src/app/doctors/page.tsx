import { notFound } from "next/navigation";
import SpecialistsGrid from "./DoctorsGrid"; // ← клієнтський
import { getStrapiEntries } from "@/utils/utils";

/* ---------- Strapi типи ---------- */
type StrapiMedia = {
  url: string;
  alternativeText?: string;
  formats?: { small?: { url: string } };
};
type StrapiDoctor = {
  id: number;
  name: string;
  slug: string;
  position?: string;
  photo: StrapiMedia;
};
type DoctorCard = {
  id: number;
  name: string;
  slug: string;
  specialty?: string;
  img: string;
  alt: string;
};

/* ---------- Fetch на сервері ---------- */
const makeUrl = (u = "") =>
  u.startsWith("http") ? u : `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ""}${u}`;

async function fetchDoctors(): Promise<DoctorCard[]> {
  const res = await getStrapiEntries<StrapiDoctor>("likars", {
    populate: "photo",
    sort: "name:asc",
    cache: "no-store",
  });

  return res.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    specialty: d.position,
    img: makeUrl(d.photo.formats?.small?.url ?? d.photo.url),
    alt: d.photo.alternativeText ?? d.name,
  }));
}

/* ---------- Сторінка ---------- */
export default async function SpecialistsPage() {
  const doctors = await fetchDoctors();
  if (!doctors.length) return notFound();

  return <SpecialistsGrid doctors={doctors} />;
}
