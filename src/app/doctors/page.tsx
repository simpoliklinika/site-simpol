// src/app/doctors/page.tsx
import { notFound } from "next/navigation";
import DoctorsGrid, { DoctorCard } from "./DoctorsGrid";
import {
  fetchAllDoctorsFull,
  fetchDoctorsFilters,
} from "@/utils/strapi-doctors";

export default async function DoctorsPage() {
  const [doctorsFull, filterData] = await Promise.all([
    fetchAllDoctorsFull(),
    fetchDoctorsFilters(), // { departments: [], positions: [] }
  ]);

  if (!doctorsFull.length) return notFound();

  const cards: DoctorCard[] = doctorsFull.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    position: d.position,
    department: d.department,
    photoUrl: d.photoUrl ?? "/placeholder.jpg",
    acceptsDeclarations: d.acceptsDeclarations,
  }));

  return (
    <DoctorsGrid
      doctors={cards}
      departments={filterData.departments}
      positions={filterData.positions}
    />
  );
}
