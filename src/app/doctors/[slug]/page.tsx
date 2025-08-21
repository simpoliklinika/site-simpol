// src/app/doctors/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DoctorProfileClient from "./DoctorProfileClient";
import { fetchDoctorBySlugFull, type DoctorFull } from "@/utils/strapi-doctors";

type PageProps = { params: { slug: string } };

// Нормалізація значення до boolean (або undefined)
function normalizeAccepts(val: unknown): boolean | undefined {
  if (val === null || val === undefined) return undefined;
  if (typeof val === "boolean") return val;
  if (typeof val === "string") {
    const s = val.trim().toLowerCase();
    if (["так", "true", "yes", "y", "1"].includes(s)) return true;
    if (["ні", "false", "no", "n", "0"].includes(s)) return false;
  }
  return undefined;
}

/* SEO */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const doctor = await fetchDoctorBySlugFull(params.slug);
  if (!doctor) return { title: "Лікар не знайдений" };

  return {
    title: `${doctor.name} – ${doctor.position ?? "Лікар"}`,
    description: doctor.bio?.slice(0, 150) ?? "",
  };
}

/* Сторінка */
export default async function DoctorPage({ params }: PageProps) {
  const doctor: DoctorFull | null = await fetchDoctorBySlugFull(params.slug);
  if (!doctor) return notFound();

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 lg:px-0">
        <DoctorProfileClient
          {...doctor}
          acceptsDeclarations={normalizeAccepts(doctor.acceptsDeclarations)}
        />
      </div>
    </main>
  );
}
