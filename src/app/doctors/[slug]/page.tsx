// src/app/doctors/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorProfileClient from "./DoctorProfileClient";
import { fetchDoctorBySlugFull, DoctorFull } from "@/utils/strapi-doctors";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* SEO */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await fetchDoctorBySlugFull(slug);
  if (!doctor) return { title: "Лікар не знайдений" };

  return {
    title: `${doctor.name} – ${doctor.position ?? "Лікар"}`,
    description: doctor.bio?.slice(0, 150) ?? "",
  };
}

/* Сторінка */
export default async function DoctorPage({ params }: PageProps) {
  const { slug } = await params;
  const doctor: DoctorFull | null = await fetchDoctorBySlugFull(slug);
  if (!doctor) return notFound();

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 lg:px-0">
        <DoctorProfileClient {...doctor} />
      </div>
    </main>
  );
}
