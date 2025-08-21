// src/app/components/DoctorSwiper.tsx  (без "use client", отже server)
import DoctorSwiperClient from "./DoctorSwiper.client";
import { fetchDoctorsForSwiper } from "@/utils/strapi-doctors";

export default async function DoctorSwiper() {
  const doctors = await fetchDoctorsForSwiper(); // → запит до Strapi
  return <DoctorSwiperClient doctors={doctors} />;
}
