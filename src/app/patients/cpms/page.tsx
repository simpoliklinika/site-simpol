"use client";

import React from "react";

const CPMS = () => {
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
        Центральна лікарсько-консультативна комісія
      </h1>
    </div>
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
    <p>
      Центральна лікарсько-консультативна комісія в КНП «Сімейна поліклініка»
      ЧМР працює на постійній основі, склад комісії затверджений наказом
      генерального директора. Засідання комісії відбуваються в понеділок та
      середу, з 14.00 до 16.00 в кабінеті 417, в приміщенні КНП «Сімейна
      поліклініка» ЧМР, по вулиці Пирогова,15.
    </p>
    <div style={{ marginBottom: "1rem" }}></div>
    <div style={{ marginBottom: "1rem" }}></div>

    <p>
      Оформлення медичної документації здійснюється для пацієнтів, які уклали
      декларації з лікарями КНП «Сімейна поліклініка» ЧМР.
    </p>
    <div style={{ marginBottom: "1rem" }}></div>
    <div style={{ marginBottom: "1rem" }}></div>

    <strong>
      <h2>ЦЛКК надає батькам або законним представникам дитини:</h2>
    </strong>
    <ul>
      <li>
        - медичну документацію для отримання або продовження державної
        соціальної допомоги,{" "}
      </li>
      <li>- інші медичні довідки для дітей з інвалідністю;</li>
      <li>- довідки про стан здоров’я та потребу в догляді;</li>
      <li>- іншу медичну документацію згідно з чинним законодавством. ;</li>
    </ul>
    <div style={{ marginBottom: "1rem" }}></div>
    <div style={{ marginBottom: "1rem" }}></div>

    <p>
      Направлення пацієнтів на засідання ЦЛКК здійснюється лікарем з надання
      первинної медичної допомоги, з яким укладена декларація про медичний
      нагляд.
    </p>
  </section>
);

export default CPMS;
