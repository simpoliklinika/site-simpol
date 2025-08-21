"use client";

import React from "react";

const AboutClinic = () => {
  const currentYear = new Date().getFullYear();
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
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#5ca59f]">
        Історія&nbsp;поліклініки
      </h1>
      <p className="text-lg md:text-xl font-light text-[#5ca59f]/90">
        Комунальне некомерційне підприємство Чернігівської міської ради "Сімейна
        поліклініка"
      </p>
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
  <section className="flex-1 container mx-auto px-4 py-16 prose lg:prose-lg max-w-4xl text-justify">
    <div className="space-y-6">
      <p>
        Комунальне некомерційне підприємство «Сімейна поліклініка» Чернігівської
        міської ради створене 20.05.2021 року внаслідок об’єднання КНП «Дитяча
        поліклініка №1» ЧМР та КНП «Дитяча поліклініка №2» ЧМР в єдиний заклад.
      </p>

      <p>
        Підприємство здійснює діяльність відповідно до законодавства України та
        Статуту Підприємства. Є об’єктом комунальної власності територіальної
        громади міста Чернігова, в управлінні виконавчого комітету Чернігівської
        міської ради та підпорядковується управлінню охорони здоров’я.
      </p>

      <h3 className="mt-12 mb-2 font-semibold">Юридична адреса:</h3>
      <p>14005, м. Чернігів, вул. Пирогова, буд. 15</p>

      <h3 className="mt-8 mb-2 font-semibold">
        Місця провадження господарської діяльності:
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>вул. Пирогова, 15, м. Чернігів</li>
        <li>пр-т Левка Лук’яненка, 47, м. Чернігів</li>
        <li>вул. Красносільського, 73а, м. Чернігів</li>
        <li>вул. Текстильників, 36, м. Чернігів</li>
      </ul>

      <p>
        Основна мета діяльності: надання амбулаторно-поліклінічної медичної
        допомоги та медичних послуг дітям до 18 років та дорослим.
      </p>
    </div>
  </section>
);

export default AboutClinic;
