"use client";

import React from "react";

const Departments = () => {
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
        Відділення
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
      Інформація про відділення
    </h2>
    <div>
      В нашому медичному закладі піклуються про здоров'я пацієнтів від
      народження до похилого віку. Ми маємо чотири відділення з надання
      первинної медичної допомоги дітям від 0 до 18 років, відділення сімейної
      медицини, два спеціалізованих відділення ( лікарі спеціалісти для дітей
      від 0 до 18 років ) та спеціалізоване відділення ( лікарі спеціалісти для
      дорослого населення ), клініко - діагностична лабораторія.
    </div>
  </section>
);

export default Departments;
