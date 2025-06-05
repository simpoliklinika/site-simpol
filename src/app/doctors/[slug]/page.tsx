import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchDoctorBySlug, makeAbsoluteUrl } from "@/utils/strapi-doctors";
import DoctorProfileClient from "./DoctorProfileClient";

interface PageProps {
  params: { slug: string };
}

/* SEO */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const doctor = await fetchDoctorBySlug(params.slug);
  if (!doctor) return { title: "Лікар не знайдений" };

  return {
    title: `${doctor.name} – ${doctor.position ?? "Лікар"}`,
    description: doctor.bio?.replace(/<[^>]+>/g, "").slice(0, 150),
  };
}

/* Сторінка */
export default async function DoctorPage({ params }: PageProps) {
  const doctor = await fetchDoctorBySlug(params.slug);
  if (!doctor) return notFound();

  const photoUrl = makeAbsoluteUrl(
    doctor.photo.formats?.large?.url ?? doctor.photo.url
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e7f8f7] to-white py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <DoctorProfileClient
          name={doctor.name}
          position={doctor.position}
          bio={doctor.bio}
          photoUrl={photoUrl}
          photoAlt={doctor.photo.alternativeText ?? doctor.name}
        />
      </div>
    </main>
  );
}
