// src/app/components/ServiceCards.tsx
"use client";

import React from "react";
import { Activity, Users, FlaskConical, Bed, TrendingUp } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

const services: Service[] = [
  {
    title: "Первинна медична допомога",
    description: "Повний обсяг медичних послуг",
    icon: Activity,
    href: "/activities",
  },
  {
    title: "Спеціалізована медична допомога ",
    description:
      "Спеціалізована медична допомога дітям та дорослим, відповідно до договору з НСЗУ",
    icon: Users,
    href: "/activities",
  },
  {
    title: "Стоматологічна допомога",
    description: "Надійні послуги",
    icon: FlaskConical,
    href: "/activities",
  },
  {
    title: "Оформлення медичної документації",
    description:
      "Направлення, висновки, тимчасова непрацездатність, одержання державної соціальної допомоги дітям до 18 років",
    icon: Bed,
    href: "/activities",
  },
  {
    title: "Надання платних послуг",
    description:
      "Надання платних послуг, відповідно до чинного законодавства та затверджених тарифів.",
    icon: TrendingUp,
    href: "/activities",
  },
];

export default function ServiceCards() {
  const top = services.slice(0, 3);
  const bottom = services.slice(3);

  return (
    <section className="py-16 bg-white">
      {" "}
      {/* ← зміна: фон секції зроблено білим */}
      <div className="container mx-auto px-4 shadow-sm rounded-b-lg">
        {" "}
        {/* легка тінь для контрасту */}
        {/* grid для верхнього ряду: 1-3 картки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <a
                key={idx}
                href={svc.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className={
                    "bg-[#319c9c] rounded-xl p-6 h-full shadow transition-transform duration-300 ease-out " +
                    "hover:scale-105 hover:shadow-2xl"
                  }
                >
                  <Icon className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-200">{svc.description}</p>
                </div>
              </a>
            );
          })}
        </div>
        {/* простір між рядами */}
        <div className="h-6" />
        {/* окремий ряд, який займає повну ширину і центрує 2 нижні картки */}
        <div className="w-full lg:col-span-3">
          <div className="flex justify-center gap-6">
            {bottom.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <a
                  key={idx}
                  href={svc.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[420px] block"
                >
                  <div
                    className={
                      "bg-[#319c9c] rounded-xl p-6 h-full shadow transition-transform duration-300 ease-out " +
                      "hover:scale-105 hover:shadow-2xl"
                    }
                  >
                    <Icon className="w-10 h-10 text-white mb-4" />
                    <h3 className="text-xl text-white font-semibold mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-gray-200">{svc.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
