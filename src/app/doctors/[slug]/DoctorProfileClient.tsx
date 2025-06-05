"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  name: string;
  position?: string;
  bio?: string;
  photoUrl: string;
  photoAlt: string;
};

export default function DoctorProfileClient({
  name,
  position,
  bio,
  photoUrl,
  photoAlt,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-10"
    >
      {/* Фото */}
      <div className="w-full md:w-1/3 shrink-0">
        <Image
          src={photoUrl}
          alt={photoAlt}
          width={500}
          height={500}
          className="rounded-2xl object-cover shadow-lg"
          priority
        />
      </div>

      {/* Інфо */}
      <div className="flex-1 space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
            {name}
          </h1>
          {position && (
            <p className="mt-2 text-xl text-[#319c9c] font-semibold">
              {position}
            </p>
          )}
        </header>

        {bio && (
          <article
            className="prose max-w-none prose-slate text-lg"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        )}
      </div>
    </motion.section>
  );
}
