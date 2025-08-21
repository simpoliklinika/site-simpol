"use client";

import React from "react";

const MedicalPackages = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Hero />
      <Content />
    </main>
  );
};

// Hero section with title
const Hero = () => (
  <section
    id="hero"
    className="relative bg-white text-center py-24 md:py-32 overflow-hidden"
  >
    <div className="max-w-4xl mx-auto px-4 space-y-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#5ca59f]">
        Пакети медичних послуг
      </h1>
    </div>

    {/* Wave accent matching button color */}
    <div className="absolute bottom-0 left-0 w-full text-[#5ca59f]/20">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v40s-138-20-324-20c-186 0-361 15-554 15C370.2 35 0 60 0 60V0Z"
        />
      </svg>
    </div>
  </section>
);

// Content section with list of NSZU agreements
const Content = () => (
  <section className="flex-1 container mx-auto px-4 py-16 prose lg:prose-lg max-w-4xl text-justify">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Укладені Договори з НСЗУ:
    </h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>«Первинна медична допомога»</li>
      <li>
        «Профілактика, діагностика, спостереження, лікування та реабілітація в
        амбулаторних умовах»
      </li>
      <li>«Стоматологічна допомога дорослим та дітям»</li>
      <li>
        «Забезпечення кадрового потенціалу системи охорони здоров’я шляхом
        організації надання медичної допомоги із залученням лікарів-інтернів»
      </li>
      <li>
        «Про медичне обслуговування щодо надання розширених послуг з первинної
        медичної допомоги окремим категоріям осіб, які захищали незалежність,
        суверенітет та територіальну цілісність України»
      </li>
    </ul>
  </section>
);

export default MedicalPackages;
