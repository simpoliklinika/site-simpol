"use client";

import React from "react";

const ServiceDirections = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Hero />
      <Content />
    </main>
  );
};

const Hero = () => (
  <section
    id="hero"
    className="relative bg-white text-center py-24 md:py-32 overflow-hidden"
  >
    <div className="max-w-4xl mx-auto px-4 space-y-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#5ca59f]">
        Основні напрямки діяльності
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

const Content = () => (
  <section className="flex-1 container mx-auto px-4 py-16 prose lg:prose-lg max-w-4xl text-justify space-y-8">
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Первинна медична допомога
      </h2>
      <p>
        Первинна медична допомога дітям до 18 років та дорослим, що передбачає
        надання повного обсягу медичних послуг відповідно до Договору з НСЗУ:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          укладення декларацій з пацієнтами та забезпечення медичних потреб
          пацієнтів у межах повноважень Підприємства;
        </li>
        <li>
          динамічне спостереження за станом здоров’я пацієнтів з використанням
          лабораторних та інструментальних методів обстеження;
        </li>
        <li>
          проведення діагностики та лікування найбільш поширених захворювань;
        </li>
        <li>
          проведення обов’язкових та рекомендованих профілактичних щеплень;
        </li>
        <li>медичне спостереження за здоровими дітьми.</li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Спеціалізована медична допомога
      </h2>
      <p>
        Спеціалізована медична допомога дітям та дорослим, відповідно до
        договору з НСЗУ:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          консультування пацієнтів за електронним направленням від лікаря з
          надання первинної медичної допомоги або лікуючого лікаря;
        </li>
        <li>
          проведення лабораторних, інструментальних, функціональних досліджень
          за електронним направленням, за Програмою медичних гарантій;
        </li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Стоматологічна допомога
      </h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          дітям: безкоштовне рентгенологічне обстеження, планове та ургентне
          (невідкладне) лікування, профілактичні огляди;
        </li>
        <li>
          дорослим: безкоштовне ургентне (невідкладне) рентгенологічне
          обстеження та лікування.
        </li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Оформлення медичної документації
      </h2>
      <p>
        Направлення, висновки, тимчасова непрацездатність, одержання державної
        соціальної допомоги дітям до 18 років та інші, в межах повноважень
        Підприємства.
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Надання платних послуг
      </h2>
      <p>
        Надання платних послуг, відповідно до чинного законодавства та
        затверджених тарифів.
      </p>
    </div>
  </section>
);

export default ServiceDirections;
