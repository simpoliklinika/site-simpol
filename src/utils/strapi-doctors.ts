// src/utils/strapi-doctors.ts
import { fetchFromStrapi } from "./utils";

/* ---------- Типи ---------- */
export type DoctorFull = {
  id: number;
  name: string;
  slug: string;
  position?: string;
  bio?: string;
  photoUrl?: string;
  department?: string;
  experience?: string;
  qualification?: string;
  education?: string;
  courses?: string;
  seminars?: string;
  adress?: string;
  schedule?: string;
  acceptsDeclarations?: boolean | string;
  cabinet: string;
  addLikar?: boolean;
};

/* ---------- Допоміжне ---------- */
export const makeAbsoluteUrl = (u = "") =>
  u.startsWith("http")
    ? u
    : `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${u}`;

const COLLECTION = "likars";
type RawItem = { id: number; attributes?: any } & any;

/* ---------- Функції ---------- */
// 1) Усі лікарі (повні дані)
export async function fetchAllDoctorsFull(): Promise<DoctorFull[]> {
  const res = await fetchFromStrapi<{ data: RawItem[] }>(COLLECTION, {
    populate: "*",
    pagination: { page: 1, pageSize: 1000 }, // отримати всі записи
  });
  if (!res?.data) return [];
  return res.data.map(toDoctorFull);
}

// 2) Один лікар за slug (повні дані)
export async function fetchDoctorBySlugFull(
  slug: string,
): Promise<DoctorFull | null> {
  const res = await fetchFromStrapi<{ data: RawItem[] }>(COLLECTION, {
    filters: { slug: { $eq: slug } },
    populate: "*",
    pagination: { page: 1, pageSize: 1 },
  });
  const raw = res?.data?.[0];
  return raw ? toDoctorFull(raw) : null;
}

/* ---------- Mapper ---------- */
function toDoctorFull(raw: RawItem): DoctorFull {
  const attrs = raw.attributes ?? raw;
  const nested = attrs.photo?.data?.attributes;
  const flat = !nested && attrs.photo;
  let photoUrl: string | undefined;

  if (nested) {
    const p = nested.formats?.medium?.url ?? nested.url;
    photoUrl = makeAbsoluteUrl(p);
  } else if (flat?.formats || flat?.url) {
    const p = flat.formats?.medium?.url ?? flat.formats?.small?.url ?? flat.url;
    photoUrl = makeAbsoluteUrl(p);
  }

  return {
    id: raw.id,
    name: attrs.name,
    slug: attrs.slug,
    position: attrs.position,
    bio: attrs.bio,
    photoUrl,
    department: attrs.department,
    experience: attrs.experience,
    qualification: attrs.qualification,
    education: attrs.education,
    courses: attrs.courses,
    seminars: attrs.seminars,
    adress: attrs.adress,
    schedule: attrs.schedule,
    acceptsDeclarations: attrs.acceptsDeclarations,
    cabinet: attrs.cabinet,
    addLikar: attrs.addLikar,
  };
}

/* ---------- Тип картки для слайдера ---------- */
export type DoctorCard = {
  id: number;
  name: string;
  specialty?: string;
  img: string;
  href: string;
  acceptsDeclarations?: boolean | string;
};

/* ---------- Лікарі тільки для слайдера ---------- */
export async function fetchDoctorsForSwiper(): Promise<DoctorCard[]> {
  const res = await fetchFromStrapi<{ data: RawItem[] }>(COLLECTION, {
    populate: "photo",
    fields: "name,slug,position,showInSlider,acceptsDeclarations",
    filters: { showInSlider: { $eq: true } },
    sort: "name:asc",
    pagination: { page: 1, pageSize: 1000 }, // всі лікарі для слайдера
  });
  if (!res?.data) return [];

  return res.data.map((raw) => {
    const attrs = raw.attributes ?? raw;
    const n = attrs.photo?.data?.attributes;
    const f = !n && attrs.photo;
    const urlPath =
      n?.formats?.medium?.url ?? n?.url ??
      f?.formats?.medium?.url ?? f?.url ??
      "/placeholder.jpg";
    const imgAbs = makeAbsoluteUrl(urlPath);

    return {
      id: raw.id,
      name: attrs.name,
      specialty: attrs.position,
      img: imgAbs,
      href: `/doctors/${attrs.slug || raw.id}`,
      acceptsDeclarations: attrs.acceptsDeclarations,
    };
  });
}

export async function fetchDoctorsFilters(): Promise<{
  departments: string[];
  positions: string[];
}> {
  const res = await fetchFromStrapi<{ data: RawItem[] }>(COLLECTION, {
    fields: "department,position",
    pagination: { page: 1, pageSize: 1000 }, // отримати усі для фільтрів
  });

  const deps = new Set<string>();
  const pos = new Set<string>();

  res?.data.forEach((raw) => {
    const a = raw.attributes ?? raw;
    if (a.department) deps.add(a.department);
    if (a.position) pos.add(a.position);
  });

  return {
    departments: Array.from(deps).sort(),
    positions: Array.from(pos).sort(),
  };
}

export async function fetchStatsData() {
  const res = await fetchFromStrapi<any>("stat"); // Запит без populate для швидкості
  if (!res?.data) return null;

  // Strapi v5 повертає дані або в attributes, або в корені
  const data = res.data.attributes ?? res.data;
  
  return {
    deps: data.deps || 0,
    doctors: data.doctors || 0,
    vtruchan: data.vtruchan || 0,
    decl: data.decl || 0,
    dosl: data.dosl || 0,
    cons: data.cons || 0,
  };
}