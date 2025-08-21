"use client";

import React from "react";

const PDF_SRC = "/docs/анкета безбар.Пир.15.pdf";
const PDF_SRC2 = "/docs/анкета безбар.Лук47.pdf";

const safety = () => {
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
        Безбарʼєрність
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

// Content: тільки iFrame з PDF
const Content = () => (
  <section className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Пирогова 15</h1>
    <div className="relative w-full h-[80vh] rounded-xl overflow-hidden border shadow-sm">
      <iframe
        src={`${PDF_SRC}#view=FitH&zoom=page-fit`}
        title="PDF про безбарʼєрність"
        className="absolute inset-0 w-full h-full"
      />
    </div>
    <div> </div>
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">
      Левка Лукʼяненка 47
    </h1>
    <div className="relative w-full h-[80vh] rounded-xl overflow-hidden border shadow-sm">
      <iframe
        src={`${PDF_SRC2}#view=FitH&zoom=page-fit`}
        title="PDF про безбарʼєрність"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  </section>
);

export default safety;
